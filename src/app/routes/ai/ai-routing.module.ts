import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from "../backlink/post/post-list/post-list.component";
import {EditPostComponent} from "../backlink/post/edit-post/edit-post.component";
import {PostService} from "../../core/service/post.service";
import {EditRobotComponent} from "./robots/edit-robot/edit-robot.component";

const routes: Routes = [
  {path: 'robot-list', component: PostListComponent,},
  {path: 'add-robot', component: EditPostComponent,},
  {
    path: 'edit-robot/:id',
    component: EditRobotComponent,
    resolve: {data: () => inject(PostService).getClientById()}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiRoutingModule { }
