import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardinghomeComponent } from './onboardinghome/onboardinghome.component';

const routes: Routes = [
  { path: 'studentonboardinghome', component: OnboardinghomeComponent},
  { path: '', redirectTo: '/studentonboardinghome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
