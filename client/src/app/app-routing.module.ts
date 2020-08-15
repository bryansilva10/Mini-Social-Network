import { PostCreateComponent } from './posts/post-create/post-create-component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//array of routes
const routes: Routes = [
	{
		path: '',
		component: PostListComponent
	},
	{
		path: 'create',
		component: PostCreateComponent
	},
	{
		path: 'edit/:postId',
		component: PostCreateComponent
	}
];

@NgModule({
	//import and use routermodule for our defined routes
	imports: [RouterModule.forRoot(routes)],
	//export the module
	exports: [RouterModule]
})
export class AppRoutingModule { }
