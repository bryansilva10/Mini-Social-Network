//import
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //for connecting

//models
const Post = require('./models/post'); //post model

//connection
mongoose.connect('mongodb+srv://admin-bryan:bryanpass@cluster0-mnqtb.mongodb.net/Social-Network?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Connected to DB')
}).catch(() => {
	console.log('Connection to DB failed')
})

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
	//retrieve req body and save it on instance of POST MODEL
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	});
	//save to database
	post.save();
	//send response
	res.status(201).json({ message: 'Post created successfully' });
});

app.get('/api/posts', (req, res, next) => {
	//use post model to retrieve data
	Post.find().then(documents => {
		//send response with status 200 and json data after db query is done
		res.status(200).json({
			message: 'Post fetched correctly',
			posts: documents
		})
	});
})

module.exports = app;