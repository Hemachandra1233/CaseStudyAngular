import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpersonationRoutingModule } from './impersonation-routing.module';
import { ImpersonationComponent } from './impersonation/impersonation.component';


@NgModule({
  declarations: [
    ImpersonationComponent
  ],
  imports: [
    CommonModule,
    ImpersonationRoutingModule
  ]
})
export class ImpersonationModule { }
