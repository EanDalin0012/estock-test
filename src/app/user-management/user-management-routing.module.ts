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
    path: '', component: UserManagementComponent,
    children: [
      {path: 'role', component: RoleComponent},
      {path: 'authority', component: AuthorityComponent},
      {path: 'user', component: UserComponent},
      {path: 'user-add', component: UserAddComponent},
      {path: 'user-edit', component: UserEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
