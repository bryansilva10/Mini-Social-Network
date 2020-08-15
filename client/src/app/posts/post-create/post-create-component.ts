import { Post } from './../post.model';
import { PostService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
	//properties
	enteredContent = '';
	enteredTitle = '';
	private mode = 'create'; //prop for state of creation/edition
	private postId: string; //prop to store id of post
	post: Post;
	isLoading = false; //prop for loading spinner
	form: FormGroup; //reactive form

	//constructor, inject post service and route
	constructor(private postService: PostService, private route: ActivatedRoute) {

	}

	ngOnInit() {
		//init reactive form
		this.form = new FormGroup({
			//define form controls (initial state, async or sync validators)
			'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
			'content': new FormControl(null, { validators: [Validators.required] })
		})

		//subscribe to change in the param in url
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			//check if param map has the id (meaning we are in edit mode)
			if (paramMap.has('postId')) {
				//set mode to edit
				this.mode = 'edit';
				//get id from param and store it
				this.postId = paramMap.get('postId');
				//set state of loading spinner to true
				this.isLoading = true;
				//retrieve post using id and service
				this.postService.getPost(this.postId).subscribe(postData => {
					//set state of loading spinner to false (because we already got response by now)
					this.isLoading = false;
					//set post prop to be object with data from response
					this.post = {
						id: postData._id,
						title: this.post.title,
						content: postData.content
					}
					//set init value for form edition
					this.form.setValue({
						'title': this.post.title,
						'content': this.post.content
					})
				})
			} else {
				this.mode = 'create';
				this.postId = null;
			}
		})
	}

	//method to event of adding post
	onSavePost() {
		if (this.form.invalid) {
			return;
		}

		//load spinner
		this.isLoading = true;

		//check mode
		if (this.mode === 'create') {
			//use service to add post
			this.postService.addPost(this.form.value.title, this.form.value.content)
		} else {
			//use service to add post
			this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content)
		}
		//clear form
		this.form.reset();
	}
}
