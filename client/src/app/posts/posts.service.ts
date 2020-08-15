import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	//prop
	private posts: Post[] = [];
	//subject for emitting update
	private postsUpdated = new Subject<Post[]>();

	//constructor, inject http client, inject router
	constructor(private http: HttpClient, private router: Router) { }

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

	//get a single post
	getPost(id: string) {
		//return request
		return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts' + id);
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
		this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
			.subscribe((responseData) => {
				//retrieve id from serve response
				const id = responseData.postId;
				//update post object with retrieved id
				post.id = id;
				//push post into posts array
				this.posts.push(post);
				//emit an update 
				this.postsUpdated.next([...this.posts]);
				//redirect to root
				this.router.navigate(['/']);
			})
	}

	//method to update a post
	updatePost(id: string, title: string, content: string) {
		//create instance of post
		const post: Post = {
			id: id,
			title: title,
			content: content
		}

		//request put and send post to update
		this.http.put('http://localhost:3000/api/posts/' + id, post)
			.subscribe(response => {
				//make copy of posts
				const updatedPosts = [...this.posts];
				//get index of post that was updated
				const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
				//acess that index and set that post to be the new istance of post
				updatedPosts[oldPostIndex] = post;
				//set the post prop to be the updatedPosts list
				this.posts = updatedPosts;
				//emit change
				this.postsUpdated.next([...this.posts]);
				//redirect to root
				this.router.navigate(['/']);
			})
	}

	//method to delete post
	deletePost(postId: string) {
		//http request
		this.http.delete('http://localhost:3000/api/posts/' + postId)
			.subscribe(() => {
				//create updated post list by filtering out the ones that don't exist
				const updatedPosts = this.posts.filter(post => post.id !== postId);
				//set updated post to be the actual list of posts
				this.posts = updatedPosts;
				//emit changes sending copy of list
				this.postsUpdated.next([...this.posts]);
			})
	}
}