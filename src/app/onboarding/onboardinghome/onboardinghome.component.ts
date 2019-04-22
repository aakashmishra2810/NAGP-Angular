import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { OnboardingServiceService } from '../services/onboarding-service.service';

@Component({
  selector: 'app-onboardinghome',
  templateUrl: './onboardinghome.component.html',
  styleUrls: ['./onboardinghome.component.css']
})
export class OnboardinghomeComponent implements OnInit {

  categories: string[] = ['All', 'Domestic', 'International'];
  selectedCategory: string = '';
  searchStudentString: string = '';
  constructor(public studentOnboardingService: OnboardingServiceService) { }

  ngOnInit() {
    this.selectedCategory = 'All';
  }
  onDeletedClick(student: Student) {
    let canDelete = confirm("Do you really want to delete?");
    if (canDelete) {
     this.studentOnboardingService.DeleteStudentServiceRequest(student);
    }
  }
}
