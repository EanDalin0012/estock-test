import { AddOTComponent } from './add-ot/add-ot.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { OTComponent } from './ot/ot.component';
import { RequestComponent } from './request.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ot',
    pathMatch: 'full'
  },
  {
    path: '', component: RequestComponent,
    children: [
      {
        path: 'ot',
        children: [
          {path: '',  component: OTComponent},
          {path: 'add',  component: AddOTComponent}
        ],
      },
      {
        path: 'leave',
        children: [
          {path: '',  component: OTComponent},
          {path: 'add',  component: AddLeaveComponent}
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
