import {Component, Inject} from '@angular/core';
import {MediaService} from "../../../core/service/media.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Media} from "../../../core/interface/media";
import {Sort, SortDirection} from "@angular/material/sort";
import {ToolsService} from "../../../core/service/tools.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostService} from "../../../core/service/post.service";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.less']
})
export class MediaComponent {
  displayedColumns: string[] = ['select', 'id', 'title', 'excerpt', 'date_add', 'date_upd', 'star'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selection = new SelectionModel<Media>(true, []);
  pageSize = 10;
  pageIndex = 0;
  totalCount = 0;
  sort!: string;
  order!: SortDirection;
  media: any;
  private postId: number;

  constructor(
    private mediaService: MediaService,
    private postService: PostService,
    public toolsService: ToolsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postId = this.data.postId
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    let mediaData = this.mediaService.allPageMedia(this.postId, this.pageIndex, this.pageSize, this.sort, this.order).subscribe((res: any) => {
      this.dataSource.data = res.data.result.map((item: {
        date_upd: any;
        date_add: any;
        status: any;
        description: any;
        excerpt: any;
        title: any; id: any;
      }) => ({
        mediaId: item.id,
        mediaTitle: item.title,
        mediaExcerpt: item.excerpt,
        mediaDescription: item.description,
        mediaStatus: item.status,
        mediaAddDate: item.date_add,
        mediaUpdateDate: item.date_upd,
      }));
      this.totalCount = res.data.total;

      this.dataSource.data.forEach((item: any) => {
        if (item.mediaStatus === 1) {
          this.selection.select(item);
        }
      });
    });
  }

  onPageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPage();
  }

  sortData(sort: Sort) {
    this.pageIndex = 0;
    this.sort = sort.active;
    this.order = sort.direction;
    this.loadPage();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(item?: any): string {
    if (!item) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(item) ? 'deselect' : 'select'} item ${item.mediaId + 1}`;
  }

  getSelectedRowIds() {
    const selectedItems: Media[] = this.selection.selected;
    const idsArray = Object.values(selectedItems).map(obj => obj.mediaId);
    return JSON.stringify(idsArray);
  }

  onFilesSelected(files: File[]) {
    if (files) {
      for (let i: number = 0; i < files.length; i++) {
        const file: File = files[i];
      }
    }
  }

  editPost(id: Media) {

  }

  updatePostMedia() {
    let mediaData = new FormData();
    mediaData.append('postId', this.postId.toString());
    mediaData.append('mediaId', this.getSelectedRowIds());
    this.postService.putMedia(mediaData).subscribe({
      next: (result: any) => {

      }
    })
  }
}
