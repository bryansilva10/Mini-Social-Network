//ROUTER FILE FOR POST RELATED ROUTES

const express = require('express');
//create a router
const router = express.Router();

//model
const Post = require('../models/post'); //post model

//route to add posts
router.post('', (req, res, next) => {
	//retrieve req body and save it on instance of POST MODEL
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	});
	//save to database
	post.save().then(createdPost => {
		//send response
		res.status(201).json({
			message: 'Post created successfully',
			//send id in response to be able to add post correctly on the client
			postId: createdPost._id
		});
	});

});

//route to update posts
router.put('/:id', (req, res, next) => {
	//new post instance with values form req body
	const post = new Post({
		_id: req.body.id,
		title: req.body.title,
		content: req.body.content
	})
	//use mode to update on DB, filter by param id
	Post.updateOne({ _id: req.params.id }, post)
		.then(result => {
			//send res
			res.status(200).json({ message: 'Updated successfully' });
		})
})

//route to get posts
router.get('', (req, res, next) => {
	//use post model to retrieve data
	Post.find().then(documents => {
		//send response with status 200 and json data after db query is done
		res.status(200).json({
			message: 'Post fetched correctly',
			posts: documents
		})
	});
})


//route to get a single post
router.get('/:id', (req, res, next) => {
	//use model to find by id from params
	Post.findById(req.params.id).then(post => {
		//check if post exists
		if (post) {
			//return post
			res.status(200).json(post)
		} else {
			//return error
			res.status(404).json({ message: 'Post not found' })
		}
	})
})

//route to delete a post by id
router.delete('/:id', (req, res, next) => {
	//retrieve and store id from param
	const id = req.params.id;

	//use model to delete by id with mongoose
	Post.deleteOne({ _id: id }).then(result => {
		console.log(result)
		res.status(200).json({ message: 'Post deleted successfully' });
	})

})

//export router
module.exports = router;