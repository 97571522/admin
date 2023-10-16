import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent {

  constructor(private router: Router) {
  }

  ngOnInit() {

  }
}
