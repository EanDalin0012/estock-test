import { AuthGuard } from './../share/service/auth.guard';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserComponent } from './user/user.component';
import { AuthorityComponent } from './authority/authority.component';
import { RoleComponent } from './role/role.component';
import { UserManagementComponent } from './user-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'role',
    pathMatch: 'full'
  },
  {
    path: '', canActivateChild: [ AuthGuard ], component: UserManagementComponent,
    children: [
      {
        path: 'user',
        children: [
          {path: '', component: UserComponent},
          {path: 'add', component: UserAddComponent},
          {path: 'edit', component: UserEditComponent}
        ]
      },
      {
        path: 'role',
        children: [
          {path: '', component: RoleComponent},
          {path: 'add', component: RoleAddComponent},
          {path: 'edit', component: RoleEditComponent}
        ]
      },
      {path: 'authority', component: AuthorityComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
