import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpSignInModule } from './sign-up-sign-in/sign-up-sign-in.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoggingInterceptorInterceptor } from './logging-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import {NgConfirmModule} from 'ng-confirm-box';
// import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';

// var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignUpSignInModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgConfirmModule,
    HttpClientModule,
    ChartModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass:LoggingInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
  // {provide: HTTP_INTERCEPTORS, useClass:LoggingInterceptorInterceptor, multi: true}
})
export class AppModule { }
