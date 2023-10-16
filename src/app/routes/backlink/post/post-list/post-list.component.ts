import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EditPostComponent} from "../edit-post/edit-post.component";
import {PostService} from "../../../../core/service/post.service";
import {Post} from "../../../../core/interface/post";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {SortDirection} from "@angular/material/sort";
import {ToolsService} from "../../../../core/service/tools.service";

@Component({
  selector: 'backlink-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent {
  //dataSource: Post[] = [];
  displayedColumns: string[] = ['select', 'id', 'title', 'excerpt', 'media', 'status', 'date_upd', 'star'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  sort!: string;
  order!: SortDirection;

  constructor(
    private router: Router,
    public toolsService: ToolsService,
    private postService: PostService) {
  }

  ngOnInit() {
    this.postService.all(this.pageIndex, this.pageSize, this.sort, this.order).subscribe((res: any) => {
      this.dataSource.data = res.data.result.map((item: {
        date_upd: any;
        date_add: any;
        status: any;
        description: any;
        excerpt: any;
        title: any;
        id: any;
      }) => ({
        postId: item.id,
        postTitle: item.title,
        postExcerpt: item.excerpt,
        postDescription: item.description,
        postStatus: item.status,
        postAddDate: item.date_add,
        postUpdateDate: item.date_upd,
      }));
      this.length = res.data.total;
    });
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: any) {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPost(postId: Post) {
    this.router.navigate(['backlinks/edit-post', postId]).then(r => EditPostComponent);
  }
}
