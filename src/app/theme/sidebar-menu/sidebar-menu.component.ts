import {Component} from '@angular/core';
import {MenuService} from '../../core/service/menu.service';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  childs?: FoodNode[];
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.less'],
})

export class SidebarMenuComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.childs);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private menuService: MenuService) {
    this.menuService.main().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data.result;
      }
    })
  }

  hasChild = (_: number, node: FoodNode) => !!node.childs && node.childs.length > 0;
}
