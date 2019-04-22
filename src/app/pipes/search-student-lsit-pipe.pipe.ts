import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'searchStudentLsitPipe'
})
export class SearchStudentLsitPipePipe implements PipeTransform {

  transform(studentList: Student[], searchString: string): any {
    
          return studentList.filter(s => s.FirstName.includes(searchString));
  
  }

}
