import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { OnboardingServiceService } from '../services/onboarding-service.service';
import { first } from 'rxjs/operators';

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
      console.log(student);
      this.studentOnboardingService.DeleteStudentFromList(student.ID).pipe(first())
        .subscribe(
          data => {
            alert('Student details deleted successfully');
            this.studentOnboardingService.getAllStudents();

          },
          error => {
            alert('Student details deletion failed! Please try again later.');
          }

        );;
    }
  }
}
