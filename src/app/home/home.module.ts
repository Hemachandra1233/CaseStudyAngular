import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { CreateHomeComponent } from './create-home/create-home.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { GetHomesComponent } from './get-homes/get-homes.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    CreateHomeComponent,
    GetHomesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgChartsModule,
    ChartModule,
    NgConfirmModule
  ]
})
export class HomeModule { }
