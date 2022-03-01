import { ShareModule } from './../share/share.module';
import { RequestRoutingModule } from './request-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from './leave/leave.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { OTComponent } from './ot/ot.component';
import { AddOTComponent } from './add-ot/add-ot.component';
import { RequestComponent } from './request.component';



@NgModule({
  declarations: [
    LeaveComponent,
    AddLeaveComponent,
    OTComponent,
    AddOTComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    ShareModule
  ]
})
export class RequestModule { }
