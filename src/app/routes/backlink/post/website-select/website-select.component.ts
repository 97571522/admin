import {Component, Output} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {SortDirection} from "@angular/material/sort";
import {Router} from "@angular/router";
import {PostService} from "../../../../core/service/post.service";
import {ToolsService} from "../../../../core/service/tools.service";

@Component({
  selector: 'app-website-select',
  templateUrl: './website-select.component.html',
  styleUrls: ['./website-select.component.less']
})
export class WebsiteSelectComponent {
  @Output() websiteIds = this.selectWebsite();
  displayedColumns: string[] = ['select', 'id', 'title', 'status', 'date_upd'];
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
    this.loadPostList();
  }

  loadPostList() {
    this.postService.all(this.pageIndex, this.pageSize, this.sort, this.order).subscribe((res: any) => {
      this.dataSource.data = res.data.result;
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

  selectWebsite() {
    const selectedRows = this.selection.selected;
    const selectedIds = selectedRows.map(row => row.id);
    return selectedIds;
    //console.log('Selected IDs:', selectedIds);
  }
}
