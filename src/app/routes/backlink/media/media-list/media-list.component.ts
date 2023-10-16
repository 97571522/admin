import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Sort, SortDirection} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ToolsService} from "../../../../core/service/tools.service";
import {MediaService} from "../../../../core/service/media.service";
import {Media} from "../../../../core/interface/media";

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.less']
})
export class MediaListComponent {
  displayedColumns: string[] = ['select', 'id', 'title', 'excerpt', 'date_add', 'date_upd', 'star'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selection = new SelectionModel<Media>(true, []);
  pageSize = 10;
  pageIndex = 0;
  totalCount = 0;
  sort!: string;
  order!: SortDirection;

  constructor(
    private mediaService: MediaService,
    public toolsService: ToolsService,
    private router: Router,
  ) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.mediaService.all(this.pageIndex, this.pageSize, this.sort, this.order).subscribe((res: any) => {
      this.dataSource.data = res.data.result;
      this.totalCount = res.data.total;
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

  checkboxLabel(row?: Media): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  editPost(id: Media) {
    //this.router.navigate(['backlinks/edit-post', id]).then(r => EditPostComponent);
  }
}
