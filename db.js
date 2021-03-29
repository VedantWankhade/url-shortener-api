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

const result = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: collection_name },
      { $inc: { current: 1 } },
      { returnOriginal: false },
);
    // console.log(result.value.current);
    return result.value.current;
}

async function getUrlObj(short_url) {
    const urlObj = await db.collection('urls').findOne({ short_url });
    return urlObj;
}

module.exports = { connectToDB, getDB, getNextSequence, getUrlObj };