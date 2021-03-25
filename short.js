const nanoid = require('nanoid');
const {getDB, getNextSequence} = require('./db.js') 

const SHORT_URL_LENGTH = 6;

async function short(_, { long_url }) {

    const short_url = nanoid.nanoid(SHORT_URL_LENGTH);
    const db = getDB();
    const newId = getNextSequence('urls');

    await db.collection('urls').insertOne({ id: newId, long_url, short_url });
    return short_url;
}

async function get(_, {short_url}) {

    const db = getDB();
    const data = db.collection('urls').findOne({ short_url });
    return data;
}

async function getList() {

    const db = getDB();
    const list = db.collection('urls').find({}).toArray();
    return list;
}

module.exports = {short, get, getList}