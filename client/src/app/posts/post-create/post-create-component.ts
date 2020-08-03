import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})

export class PostCreateComponent {
  //properties
  newPost = '';

  //method to event of adding post
  onAddPost() {
    this.newPost = "The user's post"
  }
}
