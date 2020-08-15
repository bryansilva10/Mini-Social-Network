//import
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //for connecting

//Routes
const postsRoutes = require('./routes/posts');

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
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
})

//use post routes
app.use('/api/posts', postsRoutes);

module.exports = app;