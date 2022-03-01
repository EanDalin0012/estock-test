import { ShareModule } from './../share/share.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleComponent } from './role/role.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { UserAssignRoleComponent } from './user-assign-role/user-assign-role.component';
import { UserManagementComponent } from './user-management.component';
import { AuthorityComponent } from './authority/authority.component';



@NgModule({
  declarations: [
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    RoleComponent,
    RoleAddComponent,
    RoleEditComponent,
    UserAssignRoleComponent,
    UserManagementComponent,
    AuthorityComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ShareModule
  ]
})
export class UserManagementModule { }
