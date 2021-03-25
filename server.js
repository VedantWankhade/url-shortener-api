const express = require('express');

const {connectToDB} = require('./db.js')
const {installHandler} = require('./api_handlers.js')

const app = express();
const API_SERVER_PORT = process.env.API_SERVER_PORT || 3000;

installHandler(app);

async function startAPIServer() {

    try {
        await connectToDB();
        app.listen(API_SERVER_PORT, () => {
            console.log(`API server started at http://localhost:${API_SERVER_PORT}`);
        })
    } catch (e) {
        console.log("Error starting API server", e);
    }
}

startAPIServer();