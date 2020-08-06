import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	//list of posts using model
	storedPosts: Post[] = [];

	onPostAdded(post) {
		//push the post received
		this.storedPosts.push(post);
	}
}
