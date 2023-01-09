import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authfiles/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FileComponent } from './file/file.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';

const routes: Routes = [

  // {
  //   path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],
  //   children:[
  //     { path: 'expenses', component: ExpensesComponent },
  //     { path: 'update-expense/:id', component: ExpensesComponent},
  //     { path: 'file', component: FileComponent}
  //   ] 
  // },
  // { path: '', component: ExpensesComponent },
  // { path: 'update-expense/:id', component: ExpensesComponent},
  // { path: 'file', component: FileComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseEntryRoutingModule { }
