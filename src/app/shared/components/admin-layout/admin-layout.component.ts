import {Component} from '@angular/core';
import {AccountService} from "../../../core/service/account.service";
import {WebsiteService} from "../../../core/service/website.service";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less'],
})
export class AdminLayoutComponent {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private accountService: AccountService, private websiteService: WebsiteService) {

  }

  ngOnInit(): void {

  }

}
