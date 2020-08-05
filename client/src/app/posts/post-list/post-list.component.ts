import { Component } from '@angular/core';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
	//properties
	// posts = [
	// 	{
	// 		title: 'First Post',
	// 		content: 'This is the first post with content'
	// 	},
	// 	{
	// 		title: 'Second Post',
	// 		content: 'This is the second post with content'
	// 	},
	// 	{
	// 		title: 'Third Post',
	// 		content: 'This is the third post with content'
	// 	}
	// ]
	posts = [];

}