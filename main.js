const nanoid = require('nanoid');
const bodyParser = require('body-parser');

app.get('/api', function (req, res) {

	db.collection('urls').find().toArray((err, data) => {

		res.json(data);
	})
})

app.post('/short', async function(req, res) {
	let fullURL = req.body.fullUrl;
	console.log('URL requested: ', fullURL);
	const shortURL = nanoid.nanoid(6);
	db.collection('urls').insertOne({"url1": fullURL, "shortURL": shortURL});
	res.redirect('/');
})

app.get('/GO/:shortId', function(req, res) {

	const shortid = req.params.shortId;
	console.log(shortid);
	getURL(shortid).then(function(url) {
		res.redirect(url);
	})
})

const getURL = async (shortid) => {

	const record = await db.collection('urls').findOne({"shortURL": shortid});
	return record.url1;
}