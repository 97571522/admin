import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from '@angular/material/radio';
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";

import {PostListComponent} from "./post-list/post-list.component";
import {PostCategoryListComponent} from "./post-category-list/post-category-list.component";
import {EditPostComponent} from './edit-post/edit-post.component';
import {CoreModule} from "../../../core/core.module";
import {SharedModule} from "../../../shared/shared.module";
import {WebsiteSelectComponent} from "./website-select/website-select.component";
import {MatRippleModule} from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    PostListComponent,
    PostCategoryListComponent,
    EditPostComponent,
    WebsiteSelectComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatRadioModule,
    CdkMenuTrigger,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    NgOptimizedImage,
    MatExpansionModule,
    SharedModule,
    MatDialogModule,
    MatRippleModule,
    MatTabsModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: []
})
export class PostModule {
}
