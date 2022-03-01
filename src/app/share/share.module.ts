import { NgModule , ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { AgGridModule } from 'ag-grid-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AgGridModule,
    AvatarModule,
    PerfectScrollbarModule
  ],
})
export class ShareModule {
  static forRoot(): ModuleWithProviders<ShareModule> {
    return {
      ngModule: ShareModule,
      providers: []
    };
  }
 }
