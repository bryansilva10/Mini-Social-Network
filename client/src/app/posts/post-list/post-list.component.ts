import { PostService } from './../posts.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
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
	posts: Post[] = [];
	//subscription
	private postsSub: Subscription;


	//constructor, inject service
	constructor(private postService: PostService) {

	}

	ngOnInit() {
		//user service to retrieve posts
		this.postService.getPosts();
		//listen to subject of updated list
		this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
			//set posts to updated posts from observable
			this.posts = posts;
		});
	}

	ngOnDestroy() {
		//remove subscription and prevent memory leaks when DOM is destroyed
		this.postsSub.unsubscribe();
	}

}


