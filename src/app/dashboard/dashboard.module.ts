import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetExpenseComponent } from './get-expense/get-expense.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { ComparingExpensesComponent } from './comparing-expenses/comparing-expenses.component';


@NgModule({
  declarations: [
    DashboardComponent,
    GetExpenseComponent,
    ChartComponent,
    ViewExpensesComponent,
    ComparingExpensesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgChartsModule,
    ChartModule,
    NgConfirmModule
  ]
})
export class DashboardModule { }
