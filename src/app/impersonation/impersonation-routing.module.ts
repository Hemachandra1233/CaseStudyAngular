import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpersonationComponent } from './impersonation/impersonation.component';

const routes: Routes = [
  { path: ':id', component: ImpersonationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpersonationRoutingModule { }
