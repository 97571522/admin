import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditPostComponent} from "./post/edit-post/edit-post.component";
import {PostListComponent} from "./post/post-list/post-list.component";
import {PostCategoryListComponent} from "./post/post-category-list/post-category-list.component";
import {WebsiteListComponent} from "./website/website-list/website-list.component";
import {EditWebsiteComponent} from "./website/edit-website/edit-website.component";
import {MediaListComponent} from "./media/media-list/media-list.component";
import {PostService} from "../../core/service/post.service";
import {MediaUploadComponent} from "./media/media-upload/media-upload.component";
import {MenuListComponent} from "./menu/menu-list/menu-list.component";
import {EditMenuComponent} from "./menu/edit-menu/edit-menu.component";


const routes: Routes = [
  {path: 'media', component: MediaListComponent,},
  {path: 'media-upload', component: MediaUploadComponent,},
  {path: 'post-list', component: PostListComponent,},
  {path: 'add-post', component: EditPostComponent,},
  {path: 'post-category-list', component: PostCategoryListComponent},
  {
    path: 'edit-post/:id',
    component: EditPostComponent,
    resolve: {data: () => inject(PostService).getClientById()}
  },
  {path: 'website-list', component: WebsiteListComponent,},
  {path: 'edit-website/:websiteId', component: EditWebsiteComponent},
  {path: 'menu-list', component: MenuListComponent,},
  {path: 'edit-menu', component: EditMenuComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BacklinkRoutingModule {

}
