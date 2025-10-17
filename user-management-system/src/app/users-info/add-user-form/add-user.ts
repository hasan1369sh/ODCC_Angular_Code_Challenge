import { Component, EventEmitter, Output } from '@angular/core';
import { Education, User } from '../../models/user-interfaces';
import { UserManagementService } from '../../services/user-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser {

  constructor(private userService: UserManagementService){}
  @Output() refreshGrid: EventEmitter<boolean> = new EventEmitter()
  educations: Education[] = [];
  isNewUser: boolean = true;
  user: User = new User();
  ngOnInit(){
    this.userService.userSubject.subscribe((res: any)=>{
      if(res){
        const userEducation = this.educations.find(edu => edu.value === res.education) || null;
        this.user ={
        id:  res.id,
        firstName:  res.firstName,
        lastName:  res.lastName,
        age:  res.age,
        education: userEducation,
        profilePhoto:  res.profilePhoto,
        nationalId:  res.nationalId,
        birthDate: res.birthDate
      }
    }
    });
    this.userService.isNewUserSubject.subscribe((res:any)=>{
      this.isNewUser = res;
    })
    this.educations = [
      {
        id: 0,
        key: 0,
        value: 'انتخاب کنید'
      },
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
  onCancel(){
    this.user = new User();
    this.isNewUser = true;
  }
 addNewUser() {
  if (!this.userService.validateUser(this.user)) {
    return;
  }

  const existingUsers = this.getUsersFromStorage();

  if (this.isNewUser) {
    if (this.isNationalIdDuplicate()) {
      return;
    }
  } else {
    if (this.isNationalIdDuplicateForEdit()) {
      return;
    }
  }

  const updatedUser = {
    id: this.isNewUser ? this.generateId() : this.user.id,
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    age: this.user.age,
    nationalId: this.user.nationalId,
    birthDate: this.user.birthDate.shamsi,
    education: this.user.education?.value,
    profilePhoto: this.user.profilePhoto
  };

  if (this.isNewUser) {
    existingUsers.push(updatedUser);
  } else {
    const index = existingUsers.findIndex(u => u.id === this.user.id);
    if (index !== -1) {
      existingUsers[index] = updatedUser;
    }
  }

  this.saveUsersToStorage(existingUsers);

  console.log('کاربر ذخیره شد:', updatedUser);
  let message = this.isNewUser ? 'کاربر با موفقیت افزوده شد' : 'کاربر با موفقیت به‌روزرسانی شد';
  Swal.fire({
          text: message,
          icon: 'success',
          confirmButtonText: 'تایید'
        });
  this.onCancel();
  this.refreshGrid.emit();
}

generateId(): number {
  const users = this.getUsersFromStorage();
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

getUsersFromStorage(): any[] {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
}

saveUsersToStorage(users: any[]): void {
  localStorage.setItem('users', JSON.stringify(users, null, 2));
}
isNationalIdDuplicate(): boolean {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const duplicate = users.find((user: any) =>
    user.nationalId.toString() === this.user.nationalId.toString()
  );

  if (duplicate) {
    let message = ` کاربر با کد ملی ${this.user.nationalId} قبلاً ثبت شده است`;
    Swal.fire({
          text: message,
          icon: 'warning',
          confirmButtonText: 'تایید'
        });
    return true;
  }

  return false;
}

isNationalIdDuplicateForEdit(): boolean {
  const users = this.getUsersFromStorage();
  const duplicate = users.find((user: any) =>
    user.nationalId.toString() === this.user.nationalId.toString() &&
    user.id !== this.user.id
  );

  if (duplicate) {
    let message = ` کاربر با کد ملی ${this.user.nationalId} قبلاً ثبت شده است`;
    Swal.fire({
          text: message,
          icon: 'warning',
          confirmButtonText: 'تایید'
        });
    return true;
  }

  return false;
}
}
