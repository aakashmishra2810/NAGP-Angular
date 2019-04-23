import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root'
})
export class OnboardingServiceService {
  studentList$: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  documentList$: BehaviorSubject<String[]> = new BehaviorSubject([]);  

  constructor(private http: HttpClient) { 
    this.getAllStudents();
    this.GetDocumentList();
  }

  GetDocumentList() {
    if (this.documentList$.getValue().length == 0) {
      const url = 'assets/DocumentList.json';
      this.http.get<String[]>(url).subscribe(data => {
        //console.log(data);
        this.documentList$.next(data);
        localStorage.setItem('documentList', JSON.stringify(data));
      });
    }

  }
  GetAllDocumentList() {

    // if (==""){

    // }

    return JSON.parse(localStorage.getItem('documentList'));
  }

  getAllStudents() {
    this.http.get<Student[]>(`/students`).subscribe(data => {
      this.studentList$.next(data);
    });
  }
  AddStudent(student: Student) {
    return this.http.post(`/student/add`, student);
  }
  EditStudentDetails(student: Student) {
    return this.http.put(`/student/edit/${student.ID}`, student);
  }
  DeleteStudentServiceRequest(student: Student) {
    let currentData = this.studentList$.getValue();
    currentData.splice(currentData.indexOf(student), 1);
    console.log(currentData.indexOf(student));
    this.studentList$.next(currentData);
  }
  DeleteStudentFromList(studentID: number)
{
    return this.http.put(`/student/delete/${studentID}`,Student);
}
  AddStudentToEdit(studentID: number) {
    window.localStorage.removeItem("editStudentID");
    localStorage.setItem('editStudentID', JSON.stringify(studentID));
  }
  AddStudentToView(studentID: number) {
    window.localStorage.removeItem("viewStudentID");
    localStorage.setItem('viewStudentID', JSON.stringify(studentID));
  }
  RemoveStudentFromEdit() {
    window.localStorage.removeItem("editStudentID");
  }
  RemoveStudentFromView() {
    window.localStorage.removeItem("viewStudentID");
  }
  GetStudentToEdit(studentID: string) {
    //let studentID = window.localStorage.getItem("editStudentID");
    return this.http.get<Student>(`/students/${studentID}`);

  }

  GetStudentToView(studentID: string) {
    //let studentID = window.localStorage.getItem("editStudentID");
    return this.http.get<Student>(`/students/${studentID}`);

  }
}
