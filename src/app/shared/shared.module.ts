import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {ThemeModule} from "../theme/theme.module";
import {AdminLayoutComponent} from "./components/admin-layout/admin-layout.component";
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {Error403Component} from './components/errors/error403/error403.component';
import {Error404Component} from './components/errors/error404/error404.component';
import {Error500Component} from './components/errors/error500/error500.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CoreModule} from "../core/core.module";
import {MediaComponent} from './components/media/media.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {EaEditorComponent} from './components/ea-editor/ea-editor.component';
import {EditorComponent, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    BreadcrumbComponent,
    PageHeaderComponent,
    DefaultLayoutComponent,
    Error403Component,
    Error404Component,
    Error500Component,
    MediaComponent,
    EaEditorComponent,
  ],
  exports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    EaEditorComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        RouterOutlet,
        RouterLinkActive,
        RouterLink,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatRippleModule,
        MatListModule,
        MatSidenavModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        CdkAccordionModule,
        ThemeModule,
        MatProgressBarModule,
        CoreModule,
        MatDialogModule,
        MatTabsModule,
        MatGridListModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        EditorComponent,
        FormsModule,
    ],
  providers: [{provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}]
})
export class SharedModule {
}
