import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';


@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
	//properties
	enteredContent = '';
	enteredTitle = '';
	//prop to emit event
	@Output() postCreated = new EventEmitter<Post>();

	//method to event of adding post
	onAddPost() {
		//create a post
		const post: Post = {
			title: this.enteredTitle,
			content: this.enteredContent
		}
		//emit event sending the post
		this.postCreated.emit(post);
	}
}
