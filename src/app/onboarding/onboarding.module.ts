import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardinghomeComponent } from './onboardinghome/onboardinghome.component';
import { FilterStudentListPipe } from '../pipes/filter-student-list.pipe';
import { SearchStudentLsitPipePipe } from '../pipes/search-student-lsit-pipe.pipe';

@NgModule({
  declarations: [OnboardinghomeComponent, FilterStudentListPipe, SearchStudentLsitPipePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
