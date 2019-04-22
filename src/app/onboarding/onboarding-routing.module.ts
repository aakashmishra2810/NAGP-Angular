import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardinghomeComponent } from './onboardinghome/onboardinghome.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';

const routes: Routes = [
  { path: 'studentonboardinghome', component: OnboardinghomeComponent, canActivate: [AuthGuardGuard]},
  { path: '', redirectTo: '/studentonboardinghome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
