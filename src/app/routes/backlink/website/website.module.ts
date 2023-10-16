import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from '@angular/common';

import {WebsiteRoutingModule} from './website-routing.module';
import {EditWebsiteComponent} from './edit-website/edit-website.component';
import {WebsiteListComponent} from './website-list/website-list.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AddWebsiteCategoryComponent} from './add-website-category/add-website-category.component';
import {WebsiteCategoryListComponent} from './website-category-list/website-category-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../../../shared/shared.module";
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [
    EditWebsiteComponent,
    WebsiteListComponent,
    AddWebsiteCategoryComponent,
    WebsiteCategoryListComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SharedModule,
    MatChipsModule
  ], providers: [DatePipe]
})
export class WebsiteModule {
}
