import { AuthGuard } from './share/service/auth.guard';
import { Error404Component } from './error/error404/error404.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LayoutBlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: 'home',  canActivate: [ AuthGuard ], component: LayoutComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user-management', canActivate: [ AuthGuard ],component: LayoutComponent,
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: 'request', canActivate: [ AuthGuard ],component: LayoutComponent,
    loadChildren: () => import('./request/request.module').then(m => m.RequestModule)
  },
   // { path: 'announce/4error', component: Error4Component }, ETypeModule
  // { path: 'error500', component: Error500Component },
  // { path: 'error403', component: Error403Component },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
