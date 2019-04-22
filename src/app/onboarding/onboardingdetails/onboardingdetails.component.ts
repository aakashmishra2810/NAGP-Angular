import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from 'src/app/models/student';
import { OnboardingServiceService } from '../services/onboarding-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-onboardingdetails',
  templateUrl: './onboardingdetails.component.html',
  styleUrls: ['./onboardingdetails.component.css']
})
export class OnboardingdetailsComponent implements OnInit {

  @Input() student: Student;
  @Output() deleteService = new EventEmitter();
  
  constructor(private studentOnboardingService: OnboardingServiceService) { }

  ngOnInit() {
  }

  getColor(category: string) {
    switch (category) {
      case "Domestic":
        return "#AFEEEE";

      default:
        return "#FFFFE0";
    }
  }

  onEdit(student: Student) {
    this.studentOnboardingService.AddStudentToEdit(student.ID);
  }

  onView(student: Student) {
    this.studentOnboardingService.AddStudentToView(student.ID);
  }
  onDelete(student: Student) {
    this.deleteService.emit(student);
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
