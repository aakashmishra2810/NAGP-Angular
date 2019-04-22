import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BackendInterceptor, BackendProvider } from './fakeserver/server';
import { RegisterComponent } from './register/register/register.component';
import { AuthService } from './services/auth.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OnboardingModule } from './onboarding/onboarding.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    OnboardingModule
  ],
  providers: [BackendProvider, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
