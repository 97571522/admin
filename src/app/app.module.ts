import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {RoutesModule} from "./routes/routes.module";
import {SharedModule} from "./shared/shared.module";
import {ThemeModule} from "./theme/theme.module";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterOutlet,
    CoreModule,
    RoutesModule,
    SharedModule,
    ThemeModule,
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {dateInput: 'YYYY-MM-DD',},
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'YYY MMM',
          dateAllyLabel: 'LL',
          monthYearAllyLabel: 'YYY MMMM'
        }
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
