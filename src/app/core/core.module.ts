import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadDirective} from './directive/upload.directive';


@NgModule({
  declarations: [
    UploadDirective
  ],
  exports: [
    UploadDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
