import { PostService } from './../posts.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
	//properties
	enteredContent = '';
	enteredTitle = '';

	constructor(private postService: PostService) {

	}

	//method to event of adding post
	onAddPost(form: NgForm) {
		if (form.invalid) {
			return;
		}

		//use service to add post
		this.postService.addPost(form.value.title, form.value.content)
		//clear form
		form.resetForm();
	}
}
