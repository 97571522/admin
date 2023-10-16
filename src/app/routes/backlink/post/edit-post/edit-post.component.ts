import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatChipInputEvent} from "@angular/material/chips";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {DatePipe} from "@angular/common";

import {PostService} from "../../../../core/service/post.service";
import {Media} from "../../../../core/interface/media";
import {WebsiteSelectComponent} from '../website-select/website-select.component';
import {ToolsService} from "../../../../core/service/tools.service";
import {MediaComponent} from "../../../../shared/components/media/media.component";
import {lastValueFrom} from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-backlink-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less']
})
export class EditPostComponent {
  isNewPost: boolean = true;
  websites: any = [];
  keywords: any = [];
  announcer: any = inject(LiveAnnouncer);
  postData: FormData = new FormData();
  postForm !: FormGroup;
  inputContent: string | undefined;
  pageId: number | undefined;
  postId: number | undefined;
  postGallery: Media[] = [];
  statusOption: any = [
    {value: 1, label: 'Active'},
    {value: -1, label: 'Trash'},
    {value: 0, label: 'option3'}
  ];
  private editorValue: string | undefined;

  constructor(
    private datePipe: DatePipe,
    private toolsService: ToolsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private postService: PostService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.postId = parseInt(<string>this.activatedRoute.snapshot.paramMap.get("id"));
    //获取文章数据
    this.getPostData();
    this.postForm = this.formBuilder.group({
      postId: [null, null],
      postStatus: [null, [Validators.required]],
      postContent: [null, null],
      postAddDate: [null, [Validators.required]],
      postUpdateDate: [null, [Validators.required]],
      postTitle: [null, [Validators.required, Validators.maxLength(100)]],
      postWebsite: [null, null],
      postUrlAlias: [null, [Validators.required]],
      postExcerpt: [null, [Validators.required, Validators.maxLength(500)]],
      postMedia: [null, null],
      postSeoTitle: [null],
      postSeoKeyword: [null],
      postSeoExcerpt: [null],
    });
  }

  async getPostData() {
    if (this.postId){
      this.pageId = this.postId;
      this.isNewPost = false;
      try {
        let postData: any = await lastValueFrom(this.postService.get(this.postId))
        this.postId = postData.data.result.id;
        this.postForm.get("postId")?.patchValue(this.postId)
        this.postForm.get("postTitle")?.patchValue(postData.data.result.title)
        this.postForm.get("postExcerpt")?.patchValue(postData.data.result.excerpt)
        this.postForm.get("postContent")?.setValue(postData.data.result.content)
        this.inputContent = this.postForm.get("postContent")?.value
        this.postForm.get("postUrlAlias")?.patchValue(this.toolsService.toSeoUrl(postData.data.result.name))
        this.postForm.get("postStatus")?.patchValue(postData.data.result.status)
        for (let i: number = 0; i < postData.data.result.media.length; i++) {
          const fileData: Media = {
            mediaId: postData.data.result.media[i].id,
            mediaUrl: postData.data.result.media[i].url,
            mediaTitle: postData.data.result.media[i].title,
            mediaExcerpt: postData.data.result.media[i].excerpt,
            mediaDescription: postData.data.result.media[i].description,
            mediaStatus: postData.data.result.media[i].status,
            mediaAddDate: postData.data.result.media[i].date_add,
            mediaUpdateDate: postData.data.result.media[i].date_upd
          };
          this.postGallery.push(fileData);
        }
        this.postForm.get("postAddDate")?.patchValue(moment(this.datePipe.transform(postData.data.result.date_add, 'yyyy-MM-dd')).toDate());
        this.postForm.get("postAddDate")?.patchValue(moment(this.datePipe.transform(postData.data.result.date_upd, 'yyyy-MM-dd')).toDate());
      } catch (error) {
        console.error(error);
      }
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      // 更新文章
      if (this.postId) {
        this.postData.append('postId', this.postForm.get("postId")?.value);
        this.postData.append('postTitle', this.postForm.get("postTitle")?.value);
        this.postData.append('postWebsiteId', this.postForm.get("postWebsite")?.value);
        this.postData.append('postExcerpt', this.postForm.get("postExcerpt")?.value);
        this.postData.append('postContent', this.postForm.get("postContent")?.value);
        this.postData.append('postUrlAlias', this.postForm.get("postUrlAlias")?.value);
        this.postData.append('postStatus', this.postForm.get("postStatus")?.value);
        this.postData.append('postAddDate', this.datePipe.transform(this.postForm.get('postAddDate')?.value, 'yyyy-MM-dd') as string);
        this.postData.append('postUpdateDate', this.datePipe.transform(this.postForm.get('postUpdateDate')?.value, 'yyyy-MM-dd') as string);
        this.postData.append('postSeoKeyword', this.keywords.join(', '));

        this.postService.put(this.postData).subscribe({
          next: (result: any) => {
            if (result.data.result === true) {
              this.snackBar.open('文章已成功更新', '关闭', {
                duration: 3000,
              });
            } else {
              this.snackBar.open('文章未更新', '关闭', {
                duration: 3000,
              });
            }
          }
        })
      } else {
        //添加文章
        this.postData.append('postTitle', this.postForm.get("postTitle")?.value);
        this.postData.append('postWebsiteId', this.postForm.get("postWebsite")?.value);
        this.postData.append('postExcerpt', this.postForm.get("postExcerpt")?.value);
        this.postData.append('postContent', this.postForm.get("postContent")?.value);
        this.postData.append('postUrlAlias', this.postForm.get("postUrlAlias")?.value);
        this.postData.append('postStatus', this.postForm.get("postStatus")?.value);
        this.postData.append('postAddDate', this.datePipe.transform(this.postForm.get('postAddDate')?.value, 'yyyy-MM-dd') as string);
        this.postData.append('postUpdateDate', this.datePipe.transform(this.postForm.get('postUpdateDate')?.value, 'yyyy-MM-dd') as string);
        this.postData.append('postSeoKeyword', this.keywords.join(', '));

        this.postService.post(this.postData).subscribe({
          next: (result: any) => {
            if (result.data.result === true) {
              this.snackBar.open('文章已成功发布', 'close', {
                duration: 3000,
              });
              this.postForm.reset();
            } else {
              this.snackBar.open('文章已发布失败', 'close', {
                duration: 3000,
              });
            }
          }
        })
      }
    } else {
      const {controls} = this.postForm;
      for (const i in controls) {
        if (controls.hasOwnProperty(i)) {
          controls[i].markAsDirty()
          controls[i].updateValueAndValidity()
        }
      }
    }
  }

  openWebsiteSelect() {
    const dialogRef = this.dialog.open(WebsiteSelectComponent, {width: "900px"});
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  removeWebsite(website: string) {
    const index = this.websites.indexOf(website);
    if (index >= 0) {
      this.websites.splice(index, 1);
      this.announcer.announce(`removed ${website}`);
    }
  }

  addWebsite(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.websites.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
    }
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeMedia(media: any) {
    const index = this.postGallery.findIndex((media: any) => media === media);
    if (index !== -1) {
      if (media.mediaId) {
        this.postService.deletePageMedia(media.mediaId).subscribe({
          next: () => {
            console.log("Media file removed from the database successfully.");
            this.postGallery.splice(index, 1);
          },
          error: (error: any) => {
            console.error("Failed to remove media file from the database:", error);
          }
        });
      } else {
        this.postGallery.splice(index, 1);
      }
    }
  }

  updateMedia() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'no-scroll-dialog';
    dialogConfig.width = "calc(100% - 30px)";
    dialogConfig.height = "calc(100% - 30px)";
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.data = {
      "postId": this.postId
    }

    const dialogRef = this.dialog.open(MediaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (result: any) => {

      }
    })
  }

  onEditorValueChange(value: string) {
    this.editorValue = value;
    this.postForm.get("postContent")?.setValue(this.editorValue)
    console.log('编辑器的值:', value);
  }
}
