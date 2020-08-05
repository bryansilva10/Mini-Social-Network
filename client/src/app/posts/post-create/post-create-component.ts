import { Component } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
	//properties
	newPost = '';
	enteredValue: string = '';

	//method to event of adding post
	onAddPost() {
		this.newPost = this.enteredValue;
	}
}
