import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authfiles/auth.guard';
import { ChartComponent } from './chart/chart.component';
import { CreateHomeComponent } from './create-home/create-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetExpenseComponent } from './get-expense/get-expense.component';
import { GetHomesComponent } from './get-homes/get-homes.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';

const routes: Routes = [
  {
    path: 'gethomes', component: GetHomesComponent 
  },
  {
    path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],
    children:[
      { path: 'view-expenses', component:ViewExpensesComponent, canActivate: [AuthGuard]},
      { path: 'updatehome/:id', component: CreateHomeComponent, canActivate: [AuthGuard]},
      { path: 'get-expenses', component: GetExpenseComponent, canActivate: [AuthGuard]},
      { path: 'createhome/:id', component: CreateHomeComponent, canActivate: [AuthGuard]},
      { path: 'createhome', component: CreateHomeComponent, canActivate: [AuthGuard]}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
