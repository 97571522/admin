import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'app-ea-editor',
  templateUrl: './ea-editor.component.html',
  styleUrls: ['./ea-editor.component.less']
})
export class EaEditorComponent implements AfterViewInit {
  @Input() elementId: String | undefined;
  @Input() pageId: number | undefined;
  @Input() inputContent: String | undefined;
  @Output() outputEvent = new EventEmitter();
  @ViewChild('editor') editorRef: ElementRef | undefined;
  content: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputContent'] && changes['inputContent'].currentValue) {
      tinymce.activeEditor.setContent(changes['inputContent'].currentValue);
    }
  }

  ngAfterViewInit() {
    const ea_image_upload_handler = (blobInfo: { blob: () => Blob; filename: () => string | undefined; }, progress: (arg0: number) => void) => new Promise((resolve, reject) => {
      let pageId = tinymce.activeEditor.getParam('pageId');
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', '/api/backlink_post_post/postMedia/');

      xhr.upload.onprogress = (e) => {
        progress(e.loaded / e.total * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({message: 'HTTP Error: ' + xhr.status, remove: true});
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != 'string') {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      const formData = new FormData();
      formData.append('pageId', pageId);
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

    let init = tinymce.init({
      selector: '#' + this.elementId,
      base_url: '/tinymce',
      height: 300,
      menubar: false,
      pageId: this.pageId,
      plugins: [
        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
        'media', 'table', 'emoticons', 'template', 'help'
      ],
      toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image | print preview media | forecolor backcolor emoticons',
      automatic_uploads: true,
      images_upload_url: '/api/backlink_post_post/postMedia/',
      paste_data_images: true,
      images_upload_handler: ea_image_upload_handler,
      toolbar_sticky: false,
      content_style:'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      setup: (editor: { on: (arg0: string, arg1: () => void) => void; getContent: () => any; }) => {
        editor.on('change', () => {
          const content = editor.getContent();
        });
      }
    });
  }

  onEditorChange(content: string) {
    this.outputEvent.emit(content);
  }
}
