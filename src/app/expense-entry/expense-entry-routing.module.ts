import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { FileComponent } from './file/file.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';

const routes: Routes = [

  // {
  //   path: 'expenses', component: ExpensesComponent,
  //   children:[
  //     { path: 'update-expense/:id', component: ExpensesComponent},
  //     { path: 'file', component: FileComponent}
  //   ] 
  // },
  { path: '', component: ExpensesComponent },
  { path: 'update-expense/:id', component: ExpensesComponent},
  { path: 'file', component: FileComponent}
];
//   { path: 'dashboard', component: DashboardComponent, children:[
//   { path: 'gethomes', component: GetHomesComponent },
//   { path: 'createhome', component: CreateHomeComponent }
// ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseEntryRoutingModule { }
