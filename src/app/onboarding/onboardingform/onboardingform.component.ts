import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OnboardingServiceService } from '../services/onboarding-service.service';

@Component({
  selector: 'app-onboardingform',
  templateUrl: './onboardingform.component.html',
  styleUrls: ['./onboardingform.component.css']
})
export class OnboardingformComponent implements OnInit {
  submitButtonText: string = 'Onboard';
  categories: string[] = ['Domestic', 'International'];
  isViewState = false;
  submitted = false;
  studentForm: FormGroup;
  DocumentList = [
  ];
  initialEvent = false;
  constructor(private fb: FormBuilder, private router: Router, private studentOnboardingService: OnboardingServiceService) 
  {
    let viewStudentID = window.localStorage.getItem("viewStudentID");
    if (viewStudentID) {
      this.isViewState = true;
      this.studentOnboardingService.GetStudentToView(viewStudentID).subscribe(data => {
        if (data) {
          this.studentForm.setValue(data);
          this.studentForm.disable();
        }
      });
    }
    this.studentOnboardingService.RemoveStudentFromView();

    let editStudentID = window.localStorage.getItem("editStudentID");
    if (editStudentID) {
      this.submitButtonText = 'Update';
      this.studentOnboardingService.GetStudentToEdit(editStudentID).subscribe(data => {
        if (data) {
          
          this.studentForm.setValue(data);
        }
      });
    }
    this.studentOnboardingService.RemoveStudentFromEdit();
   }

  ngOnInit() {
    this.studentForm = this.fb.group({
      ID: [''],
      FirstName: ['', Validators.required],
      Category: ['Domestic', Validators.required],
      DocumentList: new FormArray([]),
      DOB: ['', Validators.required],
      FatherName: ['', Validators.required],
      MotherName: ['', Validators.required],
      LastScore: ['', Validators.required]
    });

    of(this.getDocumentList()).subscribe(documentList => {
      this.DocumentList = documentList;
      this.addCheckboxes();
    });

    this.studentForm.controls.Category.valueChanges.subscribe(this.updateDocumentValidator.bind(this));
    this.studentForm.enable();
  }

  get fCntrls() { return this.studentForm.controls; }

  onSubmit() {
    this.submitted = true;
    //console.log(this.fCntrls.Category.value);
    if (this.studentForm.invalid) {
      //alert('invalid');
      return;
    }
    if (this.fCntrls.ID.value) {
      this.studentOnboardingService.EditStudentDetails(this.studentForm.value)
        .pipe(first())
        .subscribe(
          data => {
            alert('Student details updated successfully');
            this.studentOnboardingService.getAllStudents();
            this.submitted = false;
            this.studentForm.reset();
          },
          error => {
            alert('Student details updation failed! Please try again later.');
          }

        );
    }
    else {

      this.studentOnboardingService.AddStudent(this.studentForm.value)
        .pipe(first())
        .subscribe(
          data => {
            alert('Student added successfully');
            this.studentOnboardingService.getAllStudents();
            this.submitted = false;
            this.studentForm.reset();
          },
          error => {
            alert('Error occured while student registration! Please try again later.');
          });
    }
  }

  private addCheckboxes() {
    this.DocumentList.map((o, i) => {


      let valditr = [];
      if (o.requiredFor == '') {
        valditr.push(Validators.required);
      }

      const control = new FormControl('', valditr); // if first item set to true, else false
      (this.studentForm.controls.DocumentList as FormArray).push(control);
    });
  }

  updateDocumentValidator() {

    let i = 0;
    while (i < (this.studentForm.controls.DocumentList as FormArray)['controls'].length) {

      this.studentForm.get('DocumentList')['controls'][i].clearValidators();

      if (this.studentForm.controls.Category.value === "Domestic") {
        if (this.DocumentList[i].requiredFor === "") {
          this.studentForm.get('DocumentList')['controls'][i].setValidators([Validators.required]);
        }
      } else {
        this.studentForm.get('DocumentList')['controls'][i].setValidators([Validators.required]);
      }
      this.studentForm.get('DocumentList')['controls'][i].updateValueAndValidity();
      i++;
    }

  }

  getDocumentList() {

    this.DocumentList = this.studentOnboardingService.GetAllDocumentList();
    return this.DocumentList;
  }
  ResetForm() {
    this.studentForm.reset();
  }

}
