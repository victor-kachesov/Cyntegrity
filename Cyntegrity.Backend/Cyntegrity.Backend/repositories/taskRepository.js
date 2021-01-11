const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

/**
 * We're using a factory function this time.
 */
module.exports = function makeUserRepository({ DB_CONNECTION_STRING, DB_NAME }) {

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

    async function getTasks() {

        return await connect(async (db) => {
            return await db.collection('Tasks')
                .find({ deleted: { $in: [null, false] } } )
                .toArray();
        })
    }

    async function getTasksByIds(ids) {

        var objectIds = ids.map(id => ObjectID(id))

        return await connect(async (db) => {
            return await db.collection('Tasks')
                .find({ _id: { $in: objectIds } })
                .toArray();
        })
    }

    async function getTask(_id) {

        return await connect(async (db) => {
            return await db.collection('Tasks')
                .findOne({ _id: ObjectID(_id) });
        })
    }

    async function addTask(task) {

        return await connect(async (db) => {
            return await db.collection('Tasks')
                .insertOne(
                    { _id: ObjectID(task._id), name: task.name, averageTime: task.averageTime, owner: ObjectID(task.owner) }
            );
        })
    }

    async function deleteTask(_id) {

        return await connect(async (db) => {
            return await db.collection('Tasks')
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

    return {
        getTasks,
        getTask,
        getTasksByIds,
        addTask,
        deleteTask,
    }
}