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

	// props
	posts: Post[] = [];
	isLoading = false;
	//subscription
	private postsSub: Subscription;


	//constructor, inject service
	constructor(private postService: PostService) {

	}

	//at time of initializing component
	ngOnInit() {
		//set loading sponner to true as soon as it initializes
		this.isLoading = true;
		//user service to retrieve posts
		this.postService.getPosts();
		//listen to subject of updated list
		this.postsSub = this.postService.getPostUpdateListener()
			.subscribe((posts: Post[]) => {
				//set loading spinner to false because we already have a response
				this.isLoading = false;
				//set posts to updated posts from observable
				this.posts = posts;
			});
	}

	//method to do something on delete event
	onDelete(postId: string) {
		//user service to delete
		this.postService.deletePost(postId);
	}

	//when component is destroyed
	ngOnDestroy() {
		//remove subscription and prevent memory leaks when DOM is destroyed
		this.postsSub.unsubscribe();
	}

}


