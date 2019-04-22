import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'filterStudentList'
})
export class FilterStudentListPipe implements PipeTransform {

  transform(studentList: Student[], category: string): any {
    if (category === 'All') {
      return studentList;
    }
    return studentList.filter(s => s.Category === category);
  }

}
