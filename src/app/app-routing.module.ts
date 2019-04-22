import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/studentonboardinghome', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent }

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
