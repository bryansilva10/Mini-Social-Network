import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	//prop
	private posts: Post[] = [];
	//subject for update
	private postsUpdated = new Subject<Post[]>();

	//constructor, inject http client
	constructor(private http: HttpClient) { }

	//method to retrieve post
	getPosts() {
		//use http client
		this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
			//use rxjs map to transform data coming in observable stream
			.pipe(map((postData) => {
				//use normal map to make every post an object with correct data(including _id)
				return postData.posts.map(post => {
					return {
						title: post.title,
						content: post.content,
						id: post._id
					}
				})
			}))
			.subscribe((transformedPosts) => {
				//set post prop to post receiving from request
				this.posts = transformedPosts;
				//emit update
				this.postsUpdated.next([...this.posts]);
			})
	}

	//method to return update as observable
	getPostUpdateListener() {
		return this.postsUpdated.asObservable();
	}

	//method to add post
	addPost(title: string, content: string) {
		//initialize post
		const post: Post = { id: null, title: title, content: content };

		//http request
		this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
			.subscribe((responseData) => {
				console.log(responseData.message);
				//push post into posts array
				this.posts.push(post)
				//emit an update 
				this.postsUpdated.next([...this.posts])
			})
	}
}