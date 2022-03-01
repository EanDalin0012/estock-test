import { ShareModule } from './share/share.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ELayoutModule } from './layout/e-layout.module';
import { Error404Component } from './error/error404/error404.component';
import { Error401Component } from './error/error401/error401.component';
import { ToastrModule } from 'ngx-toastr';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutBlankComponent,
    Error404Component,
    Error401Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ELayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    // ShareModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
