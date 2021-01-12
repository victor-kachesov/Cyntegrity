const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const PipilinesCollectionName = 'Pipelines'

module.exports = function makePipelineRepository({ DB_CONNECTION_STRING, DB_NAME }) {

    async function connect(cb) {
        const client = new MongoClient(DB_CONNECTION_STRING);

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            var db = client.db(DB_NAME)

            return await cb(db);

        } finally {
            await client.close();
        }
    }

    async function getPipelines() {

        return await connect(async (db) => {
            return await db.collection(PipilinesCollectionName)
                .find({ deleted: { $in: [null, false] } } )
                .toArray();
        })
    }

    async function getPipeline(_id) {

        return await connect(async (db) => {
            return await db.collection(PipilinesCollectionName)
                .findOne({ _id: ObjectID(_id) });
        })
    }

    async function addPipeline(pipeline) {

        var taskObjects = pipeline.tasks.map((task) => {
            return {
                _id: ObjectID(task._id),
                name: task.name,
                taskId: ObjectID(task.taskId)
            }
        })

        var pipelineObject = {
            _id: ObjectID(pipeline._id),
            name: pipeline.name,
            owner: ObjectID(pipeline.owner),
            tasks: taskObjects
        }

        return await connect(async (db) => {
            return await db.collection(PipilinesCollectionName)
                .insertOne(pipelineObject);
        })
    }

    async function deletePipeline(_id) {

        return await connect(async (db) => {
            return await db.collection(PipilinesCollectionName)
                .update(
                    { _id: ObjectID(_id) },
                    {
                        $set: {
                            deleted: true
                        }
                    }
                );
        })
    }

    async function updateAverageTime(_id, averageTime) {

        return await connect(async (db) => {
            return await db.collection(PipilinesCollectionName)
                .update(
                    { _id: ObjectID(_id) },
                    {
                        $set: {
                            averageTime: averageTime
                        }
                    }
                );
        })
    }

    return {
        getPipelines,
        getPipeline,
        addPipeline,
        deletePipeline,
        updateAverageTime,
    }
}