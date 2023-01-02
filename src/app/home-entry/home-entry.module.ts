import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeEntryRoutingModule } from './home-entry-routing.module';
import { AssignUserRoleComponent } from './assign-user-role/assign-user-role.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AssignUserRoleComponent
  ],
  imports: [
    CommonModule,
    HomeEntryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeEntryModule { }
