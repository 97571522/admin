import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {DashboardComponent} from "./routes/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'backlinks',
        loadChildren: () => import('./routes/backlink/backlink.module').then(m => m.BacklinkModule)
      },
      {
        path: 'ai',
        loadChildren: () => import('./routes/ai/ai.module').then(m => m.AiModule)
      },
    ]
  },
  {
    path: '**', redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
