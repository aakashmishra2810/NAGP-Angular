import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardinghomeComponent } from './onboardinghome/onboardinghome.component';
import { FilterStudentListPipe } from '../pipes/filter-student-list.pipe';
import { SearchStudentLsitPipePipe } from '../pipes/search-student-lsit-pipe.pipe';
import { OnboardingformComponent } from './onboardingform/onboardingform.component';
import { OnboardingdetailsComponent } from './onboardingdetails/onboardingdetails.component';

@NgModule({
  declarations: [OnboardinghomeComponent, FilterStudentListPipe, SearchStudentLsitPipePipe, OnboardingformComponent, OnboardingdetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
