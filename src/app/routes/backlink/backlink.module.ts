import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BacklinkRoutingModule} from './backlink-routing.module';
import {WebsiteModule} from "./website/website.module";
import {PostModule} from './post/post.module';
import {MediaListComponent} from './media/media-list/media-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MediaUploadComponent} from './media/media-upload/media-upload.component';
import {CoreModule} from "../../core/core.module";
import {MatSortModule} from "@angular/material/sort";
import {EditMenuComponent} from './menu/edit-menu/edit-menu.component';
import {MenuListComponent} from './menu/menu-list/menu-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    MediaListComponent,
    MediaUploadComponent,
    EditMenuComponent,
    MenuListComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    BacklinkRoutingModule,
    WebsiteModule,
    PostModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    NgOptimizedImage,
    CoreModule,
    MatSortModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class BacklinkModule {

}
