import { Component } from '@angular/core';
import { Education, User } from '../../models/user-interfaces';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser {


  educations: Education[] = [];
  isNewUser: boolean = true;
  user: User = new User();
  ngOnInit(){
    this.educations = [
      {
        id: 1,
        key: 1001,
        value: 'دیپلم'
      },
      {
        id: 2,
        key: 1002,
        value: 'کارشناسی'
      },
      {
        id: 3,
        key: 1003,
        value: 'کارشناسی ارشد'
      },
      {
        id: 4,
        key: 1004,
        value: 'دکتری'
      }
    ];
  }

  addNewUser(){}
}
