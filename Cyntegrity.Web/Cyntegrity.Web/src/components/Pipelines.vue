<template>
    <div class="pipelines">
        <div>List of tasks</div>
        <ul id="tasks">
            <li v-for="task in tasks" :key="task._id">
                Name: {{ task.name }} | Average time: {{ task.averageTime }}
                <button @click="addTaskToPipeline(task)">
                    Add to pipeline
                </button>
            </li>
        </ul>

        <div>
            New pipeline name: <input v-model="newPipeline.name" placeholder="Pipeline name">
        </div>
        <div>List of pipeline tasks</div>
        <ul id="pipelineTasks">
            <li v-for="pipelineTask in pipelineTasks" :key="pipelineTask._id">
                Name: {{ pipelineTask.task.name }} | Average time: {{ pipelineTask.task.averageTime }}
                <button @click="deleteTaskFromPipeline(pipelineTask._id)">
                    Delete
                </button>
            </li>
        </ul>
        <div>
            <button v-bind:disabled="!canSavePipeline()" @click="savePipeline">Save pipeline</button>
        </div>

        <div>------------------------------------------------------------------------------------------------------------------</div>

        <div>List of pipelines</div>
        <ul id="pipelines">
            <li v-for="pipeline in pipelines" :key="pipeline._id">
                <div>
                    <span>{{ pipeline.name }} | Average time: {{ pipeline.averageTime }} | Run time: {{ pipeline.runTime }}</span>
                    <button @click="calculateAverageTime(pipeline._id)">
                        Calculate average time
                    </button>
                    <button @click="runPipeline(pipeline._id)">
                        Run pipeline
                    </button>
                </div>
                <div>
                    Tasks in pipeline:
                    <span v-for="task in pipeline.tasks" :key="task._id">
                        | {{ task.name }}
                    </span>
                </div>
            </li>
        </ul>
        
        <div>{{ pipelineFinishedMessage }}</div>

    </div>
</template>

<script>
    import ObjectID from 'bson-objectid';

    export default {
        name: 'Tasks',

        data: function () {
            return {
                newPipeline: {
                    name: null
                }
            }
        },

        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },

            tasks() {
                return this.$store.state.tasks;
            },

            pipelines() {
                return this.$store.state.pipelines;
            },

            pipelineTasks() {
                return this.$store.state.pipelineTasks;
            },

            pipelineFinishedMessage() {
                return this.$store.state.pipelineFinishedMessage;
            }
        },

        methods: {
            addTaskToPipeline(task) {

                if (this.currentUser == null) {
                    alert('Select user');
                    return false;
                }

                this.$store.dispatch('addTaskToPipeline', { _id: ObjectID().toHexString(), task: task });
            },

            deleteTaskFromPipeline(pipelineTaskId) {

                if (this.currentUser == null) {
                    alert('Select user');
                    return false;
                }

                this.$store.dispatch('deleteTaskFromPipeline', pipelineTaskId);
            },

            canSavePipeline() {
                if (this.currentUser == null) {
                    return false;
                }

                return true;
            },

            savePipeline() {
                if (this.currentUser == null) {
                    return false;
                }

                var taskObjects = this.pipelineTasks.map((t) => {
                    return {
                        _id: t._id,
                        name: t.task.name,
                        taskId: t.task._id
                    }
                })

                var pipeline = {
                    name: this.newPipeline.name,
                    owner: this.currentUser._id,
                    tasks: taskObjects
                }

                this.$store.dispatch('addPipeline', pipeline);
            },

            calculateAverageTime(pipelineId) {
                this.$store.dispatch('calculatePipelineAverageTime', pipelineId);
            },

            runPipeline(pipelineId) {
                this.$store.dispatch('runPipeline', pipelineId);
            }
        },

        created() {
            this.$store.dispatch('getTasks');
            this.$store.dispatch('getPipelines');

            //this.unsubscribe = this.$store.subscribe((mutation) => {
            //    if (mutation.type === 'addTaskToPipeline') {

            //        //console.log(`Updating to ${state.status}`);

            //        this.$store.dispatch('calculatePipelineAverageTime');
            //    }
            //});
        },

        //beforeDestroy() {
        //    this.unsubscribe();
        //},
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

