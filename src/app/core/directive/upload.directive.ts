import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {
  @Output() files: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';

  constructor(private sanitizer: DomSanitizer) {
  }

  //Dragover listener, when something is dragged over our host element
  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  };

  //Dragleave listener, when something is dragged away from our host element
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fff'
    this.opacity = '1'
  }

  @HostListener('drop', ['$event'])
  public ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'

    let files: File[] = [];
    if (event.dataTransfer) {
      for (let i: number = 0; i < event.dataTransfer.files.length; i++) {
        const file: File = event.dataTransfer.files[i];
        files.push(file);
      }
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
