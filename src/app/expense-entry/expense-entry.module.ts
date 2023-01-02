import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseEntryRoutingModule } from './expense-entry-routing.module';
import { ExpensesComponent } from './expenses/expenses.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { FileComponent } from './file/file.component';

@NgModule({
  declarations: [
    ExpensesComponent,
    UpdateExpenseComponent,
    CreateCategoryComponent,
    FileComponent
  ],
  imports: [
    CommonModule,
    ExpenseEntryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExpenseEntryModule { }
