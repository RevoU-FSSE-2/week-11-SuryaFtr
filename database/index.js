const { MongoClient } = require("mongodb");

const connectToDb = async () => {
    try {
        const client = await new MongoClient(process.env.MONGO_URI).connect();
        const db = client.db(process.env.MONGO_DB);
        //console.log(`<=================== CONNECT TO DB ==================`);
        return db
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToDb;