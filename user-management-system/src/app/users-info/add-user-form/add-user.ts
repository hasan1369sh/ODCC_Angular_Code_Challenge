import { Component, ViewChild } from '@angular/core';
import { Education, User } from '../../models/user-interfaces';
import { NgForm } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser {

  constructor(private userService: UserManagementService){}
  @ViewChild('userForm') userForm!: NgForm;
  educations: Education[] = [];
  isNewUser: boolean = true;
  user: User = new User();
  ngOnInit(){
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
    // بررسی مقدار دهی تمامی فیلدها
  if (!this.userService.validateUser(this.user)) {
    return;
  }

  // بررسی تکراری بودن قبل از ذخیره
  if (this.isNationalIdDuplicate()) {
    return;
  }

  if ( this.isNewUser) {
    // ایجاد کاربر جدید
    const newUser = {
      ...this.user,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    // دریافت کاربران موجود از localStorage
    const existingUsers = this.getUsersFromStorage();

    // اضافه کردن کاربر جدید
    existingUsers.push(newUser);

    // ذخیره در localStorage
    this.saveUsersToStorage(existingUsers);

    console.log('کاربر ذخیره شد:', newUser);
    alert('کاربر با موفقیت افزوده شد');
    this.onCancel();
  }
}

// تولید ID خودکار
generateId(): number {
  const users = this.getUsersFromStorage();
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

// دریافت کاربران از localStorage
getUsersFromStorage(): any[] {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
}

// ذخیره کاربران در localStorage
saveUsersToStorage(users: any[]): void {
  localStorage.setItem('users', JSON.stringify(users, null, 2));
}
isNationalIdDuplicate(): boolean {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const duplicate = users.find((user: any) =>
    user.nationalId.toString() === this.user.nationalId.toString()
  );

  if (duplicate) {
    alert(` کاربر با کد ملی ${this.user.nationalId} قبلاً ثبت شده است`);
    return true;
  }

  return false;
}
}
