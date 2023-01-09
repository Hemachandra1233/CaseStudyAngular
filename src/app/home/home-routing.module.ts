import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authfiles/auth.guard';
import { CreateHomeComponent } from './create-home/create-home.component';
import { GetHomesComponent } from './get-homes/get-homes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: '', component: GetHomesComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  // { path: 'createhome/:id', component: CreateHomeComponent, canActivate: [AuthGuard]},
  // { path: 'updatehome/:id', component: CreateHomeComponent, canActivate: [AuthGuard]},
  // { path: 'Createhome', component: CreateHomeComponent, canActivate: [AuthGuard]},
  {
    path: '', component: HomeComponent,canActivate: [AuthGuard], 
    children:[
      {path: '', component: GetHomesComponent, canActivate: [AuthGuard]},
      { path: 'updatehome/:id', component: CreateHomeComponent, canActivate: [AuthGuard]},
      { path: 'Createhome', component: CreateHomeComponent, canActivate: [AuthGuard]},
    ] 
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
