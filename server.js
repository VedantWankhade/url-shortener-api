const express = require('express');

const {connectToDB, getUrlObj} = require('./db.js')
const { installHandler } = require('./api_handlers.js');

const app = express();
const API_SERVER_PORT = process.env.API_SERVER_PORT || 3000;

installHandler(app);

app.use('/go/:short_url', async (req, res) => {
    // res.send(req.params.short_url);
    const urlObj = await getUrlObj(req.params.short_url);
    // console.log(urlObj)
    res.redirect(urlObj.long_url);
});

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