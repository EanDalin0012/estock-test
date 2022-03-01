import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SlidebarComponent } from './slidebar/slidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SlidebarComponent,
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SlidebarComponent,
  ]
})
export class ELayoutModule { }
