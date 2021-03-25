const { MongoClient } = require('mongodb');
require('dotenv').config();


let db;

async function connectToDB() {

    let db_url = process.env.DB_URL || 'mongodb://localhost/url-shortener-db';

    const client = await (new MongoClient(db_url, { useNewUrlParser: true })).connect();
    console.log('Connected to Database at ', db_url);
    
    db = client.db();
}

function getDB() {

    return db;
}

async function getNextSequence(collection_name) {

    const current =
        await db.collection('counters').updateOne({ _id: collection_name }, { $inc: { current: 1 }}, {returnOriginal: false})
    return (current + 1)
}

module.exports = { connectToDB, getDB, getNextSequence };