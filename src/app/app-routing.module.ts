import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authfiles/auth.guard';
import { AuthService } from './authfiles/auth.service';

const routes: Routes = [
  {path: '', loadChildren: () => import('./sign-up-sign-in/sign-up-sign-in.module').then(m => m.SignUpSignInModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  {path: 'expenses', loadChildren: () => import('./expense-entry/expense-entry.module').then(m => m.ExpenseEntryModule)},
  {path: 'home-entry', loadChildren: () => import('./home-entry/home-entry.module').then(m => m.HomeEntryModule)},
  {path: 'imporsonation', loadChildren: () => import('./impersonation/impersonation.module').then(m => m.ImpersonationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
