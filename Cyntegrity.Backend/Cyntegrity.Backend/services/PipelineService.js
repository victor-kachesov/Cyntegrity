const ObjectID = require("mongodb").ObjectID
var spawn = require("child_process").spawn;

module.exports = class PipelineService {
    constructor({ pipelineRepository, taskRepository, PIPELINE_EXECUTOR_PATH }) {
        console.log('creating message service')
        this.pipelineRepository = pipelineRepository
        this.tasksRepository = taskRepository
        this.pipelineExecutorPath = PIPELINE_EXECUTOR_PATH
    }

    async getPipelines() {

        return this.pipelineRepository.getPipelines()
    }

    async getPipeline(_id) {

        return this.pipelineRepository.getPipeline(_id)
    }

    async addPipeline(pipeline) {
        return this.pipelineRepository.addPipeline(pipeline)
    }

    async deletePipeline(_id, userId) {

        var pipeline = await this.pipelineRepository.getPipeline(_id)

        if (pipeline == null) {
            throw new Error('Pipeline not found');
        }

        var userObjectId = ObjectID(userId);

        if (pipeline.owner && !pipeline.owner.equals(userObjectId)) {
            throw new Error('You cannot delete this pipeline');
        }

        return this.pipelineRepository.deletePipeline(_id)
    }

    async calculateAverageTime(_id) {

        var pipeline = await this.pipelineRepository.getPipeline(_id)

        if (pipeline == null) {
            throw new Error('Pipeline not found');
        }

        var taskIds = pipeline.tasks.map(t => t.taskId)

        var tasks = await this.tasksRepository.getTasksByIds(taskIds)

        var totalTime = 0

        for (var i = 0; i < tasks.length; i++) {
            totalTime += tasks[i].averageTime
        }

        var averageTime = totalTime / tasks.length

        await this.pipelineRepository.updateAverageTime(_id, averageTime)

        return averageTime
    }

    async runPipeline(_id) {

        var pipeline = await this.pipelineRepository.getPipeline(_id)

        if (pipeline == null) {
            throw new Error('Pipeline not found');
        }

        const command = 'dotnet'
        const executorPath = this.pipelineExecutorPath

        return new Promise(function (resolve, reject) {

            try {
                const process = spawn(command, [executorPath, pipeline._id]);

                process.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                process.stderr.on('data', (data) => {
                    const message = `stderr: ${data}`;

                    console.error(message);

                    reject({ message: message });
                });

                process.on('error', function (err) {
                    const message = `Failed to start process for running pipeline: ${err}`;

                    console.error(message);

                    reject({ message: message });
                });

                process.on('close', (code) => {
                    const message = `Child process exited with code ${code}`;

                    console.log(message);

                    if (code == 0) {
                        resolve(code);
                        return;
                    }

                    reject({ message: message });
                });
            } catch (error) {
                const message = `Child process error: ${error}`;

                console.log(message);

                reject({ message: message });
            }
        })
    }
}