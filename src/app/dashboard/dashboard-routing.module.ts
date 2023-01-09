import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authfiles/auth.guard';
import { ExpensesComponent } from '../expense-entry/expenses/expenses.component';
import { FileComponent } from '../expense-entry/file/file.component';
import { ComparingExpensesComponent } from './comparing-expenses/comparing-expenses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetExpenseComponent } from './get-expense/get-expense.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,canActivate: [AuthGuard],
    children:[
      { path: 'view-expenses', component:ViewExpensesComponent, canActivate: [AuthGuard]},
      { path: 'get-expenses', component: GetExpenseComponent, canActivate: [AuthGuard]},
      { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard]},
      { path: 'update-expense/:id', component: ExpensesComponent, canActivate: [AuthGuard]},
      { path: 'file', component: FileComponent, canActivate: [AuthGuard]},
      { path: 'compare', component: ComparingExpensesComponent, canActivate: [AuthGuard]}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
