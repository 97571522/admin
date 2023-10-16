import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarHeaderComponent} from './sidebar-header/sidebar-header.component';
import {SidebarFooterComponent} from './sidebar-footer/sidebar-footer.component';
import {SidebarMenuComponent} from "./sidebar-menu/sidebar-menu.component";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CdkTreeModule} from "@angular/cdk/tree";


@NgModule({
  declarations: [
    SidebarHeaderComponent,
    SidebarMenuComponent,
    SidebarFooterComponent,
  ],
  exports: [
    SidebarHeaderComponent,
    SidebarMenuComponent,
    SidebarFooterComponent,
  ],
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    CdkTreeModule,
  ]
})
export class ThemeModule {
}
