import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Router} from "@angular/router";
import {SortDirection} from "@angular/material/sort";
import {WebsiteService} from "../../../../core/service/website.service";
import {Website} from "../../../../core/interface/website";
import {EditWebsiteComponent} from "../edit-website/edit-website.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'website-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.less']
})
export class WebsiteListComponent {
  //postList: Post[] = [];
  displayedColumns: string[] = ['select', 'id', 'title', 'excerpt', 'domain', 'status', 'date_upd', 'star'];
  websiteList: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  sort!: string;
  order!: SortDirection;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.websiteService.all(this.pageIndex, this.pageSize, this.sort, this.order).subscribe((res: any) => {
      this.websiteList.data = res.data.result;
      this.length = res.data.total;
    });
  }

  getFormattedTime(timestamp: number) {
    return this.datePipe.transform(timestamp * 1000, 'yyyy-MM-dd HH:mm:ss');
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.websiteList.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.websiteList.data.length;
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
    this.websiteList.filter = filterValue.trim().toLowerCase();
  }

  editWebsite(websiteId: Website) {
    this.router.navigate(['backlinks/edit-website', websiteId]).then(r => EditWebsiteComponent);
  }
}
