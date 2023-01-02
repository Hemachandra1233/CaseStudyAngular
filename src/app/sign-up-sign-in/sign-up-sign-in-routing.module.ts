import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full'},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes),
            HttpClientModule,
        DashboardModule],
  exports: [RouterModule]
})
export class SignUpSignInRoutingModule { }