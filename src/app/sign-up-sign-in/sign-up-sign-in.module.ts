import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpSignInRoutingModule } from './sign-up-sign-in-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';



@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SignUpSignInRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule
  ]
})
export class SignUpSignInModule { }
