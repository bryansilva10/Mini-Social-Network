//import
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS MIDDLEWARE
app.use((req, res, next) => {
	//set header for origin
	res.setHeader('Access-Control-Allow-Origin', '*');
	//set header for headers to be allowed
	res.setHeader('Access-Control-Allow-Headers', 'Origi, X-Requested-With, Content-Type, Accept');
	//allow headers for http methods
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
})

//post route
app.post('/api/posts', (req, res, next) => {
	//retrieve req body
	const posts = req.body;
	console.log(posts);
	res.status(201).json({ message: 'Post created successfully' });
});

app.get('/api/posts', (req, res, next) => {
	//dummy data
	const posts = [
		{
			id: '1',
			title: 'Server Side Post',
			content: 'Coming from the server'
		},
		{
			id: '2',
			title: 'Another Server Side Post',
			content: 'Another post coming from the server'
		}
	];
	//send response with status 200 and json data
	res.status(200).json({
		message: 'Post fetched correctly',
		posts: posts
	})
})

module.exports = app;