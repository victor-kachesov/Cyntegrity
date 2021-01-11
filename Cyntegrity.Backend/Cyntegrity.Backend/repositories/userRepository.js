const MongoClient = require('mongodb').MongoClient

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

    async function getUsers() {

        return await connect(async (db) => {
            return await db.collection('Users')
                .find()
                .toArray();
        })
    }

    return {
        getUsers,
    }
}