import {Component} from '@angular/core';
import {MediaService} from "../../../../core/service/media.service";

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.less']
})
export class MediaUploadComponent {
  constructor(private mediaService: MediaService) {
  }

  onFilesSelected(files: File[]) {
    if (files) {
      for (let i: number = 0; i < files.length; i++) {
        const file: File = files[i];

        let fileData = new FormData();
        fileData.append('file', file);

        this.mediaService.post(fileData).subscribe({
          next: (result: any) => {
            console.log(result);
          }
        })

        //const fileHandle: FileHandle = {
        //  file: file,
        //  url: this.sanitizer.bypassSecurityTrustUrl(
        //    window.URL.createObjectURL(file)
        //  ),
        //};
        //if(fileHandle){
        //  this.post.postGallery.push(fileHandle);
        // }
      }
    }
  }
}
