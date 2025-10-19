import { Component, enableProdMode, ViewChild } from '@angular/core';
import { Education, PopupMode, User } from '../models/user-interfaces';
import { UserManagementService } from '../services/user-management.service';
import { DxDataGridComponent } from 'devextreme-angular';
import Swal from 'sweetalert2';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

let modulePrefix = '';
// @ts-ignore
if (window && window.config?.packageConfigPaths) {
  modulePrefix = '/app';
}

@Component({
  selector: 'app-users-info',
  standalone: false,
  templateUrl: './users-info.html',
  styleUrl: './users-info.css',
})
export class UsersInfo {
  @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;

  private storageKey = 'users';
  users: User[] = [];
  currentUser: User = new User();
  isPopupVisible: boolean = false;
  cancleButtonOptions!: Record<string, unknown>;
  insertButtonOptions!: Record<string, unknown>;
  popupMode: PopupMode | null = null;
  positionOf!: string;
  educations: Education[] = [];
  constructor(public userService: UserManagementService) {
    this.userService.popupModeSubject.subscribe((res) => {
      this.popupMode = res;
    });
    this.insertButtonOptions = {
      text: 'ذخیره',
      onClick: () => {
        if (this.popupMode?.forViewUser) {
          return;
        }
        if (!this.userService.validateUser(this.currentUser)) {
          return;
        }

        const existingUsers = this.getUsersFromStorage();

        if (this.popupMode?.forAddUser) {
          if (this.isNationalIdDuplicate()) {
            return;
          }
        } else {
          if (this.isNationalIdDuplicateForEdit()) {
            return;
          }
        }

        if (this.popupMode?.forAddUser) {
          existingUsers.push(this.currentUser);
        } else {
          const index = existingUsers.findIndex((u) => u.id === this.currentUser.id);
          if (index !== -1) {
            existingUsers[index] = this.currentUser;
          }
        }

        this.saveUsersToStorage(existingUsers);

        console.log('کاربر ذخیره شد:', this.currentUser);
        this.refreshDxGrid();
        this.isPopupVisible = false;
        let message = this.popupMode?.forAddUser
          ? 'کاربر با موفقیت افزوده شد'
          : 'کاربر با موفقیت به‌روزرسانی شد';
        Swal.fire({
          text: message,
          icon: 'success',
          confirmButtonText: 'تایید',
          backdrop: true,
          target: document.body,
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
      },
    };
    this.cancleButtonOptions = {
      text: 'انصراف',
      onClick: () => {
        this.refreshDxGrid();
        this.isPopupVisible = false;
        this.currentUser = new User();
        this.userService.setUser(new User());
        this.popupMode = {
          forAddUser: true,
          forEditUser: false,
          forViewUser: false,
        };
      },
    };
  }

  generateId(): number {
    const users = this.getUsersFromStorage();
    return users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
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
    const duplicate = users.find(
      (user: any) => user.nationalId.toString() === this.currentUser.nationalId.toString()
    );

    if (duplicate) {
      let message = ` کاربر با کد ملی ${this.currentUser.nationalId} قبلاً ثبت شده است`;
      Swal.fire({
        text: message,
        icon: 'warning',
        confirmButtonText: 'تایید',
        backdrop: true,
        target: document.body,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      return true;
    }

    return false;
  }

  isNationalIdDuplicateForEdit(): boolean {
    const users = this.getUsersFromStorage();
    const duplicate = users.find(
      (user: any) =>
        user.nationalId.toString() === this.currentUser.nationalId.toString() &&
        user.id !== this.currentUser.id
    );

    if (duplicate) {
      let message = ` کاربر با کد ملی ${this.currentUser.nationalId} قبلاً ثبت شده است`;
      Swal.fire({
        text: message,
        icon: 'warning',
        confirmButtonText: 'تایید',
        backdrop: true,
        target: document.body,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      return true;
    }

    return false;
  }
  ngOnInit() {
    this.userService.popupModeSubject.subscribe((res) => {
      this.popupMode = res;
    });
    this.loadUsers();
    this.educations = [
      { value: 'زیر دیپلم', text: 'زیر دیپلم' },
      { value: 'دیپلم', text: 'دیپلم' },
      { value: 'کاردانی', text: 'کاردانی' },
      { value: 'کارشناسی', text: 'کارشناسی' },
      { value: 'کارشناسی ارشد', text: 'کارشناسی ارشد' },
      { value: 'دکترا', text: 'دکترا' },
    ];
  }

  loadUsers() {
    const usersJson = localStorage.getItem(this.storageKey);
    this.users = usersJson ? JSON.parse(usersJson) : [];
  }

  refreshDxGrid() {
    setTimeout(() => {
      this.loadUsers();
      this.dataGrid?.instance.refresh();
    }, 200);
  }
  selectedUser(e: any) {
    this.userService.setUser(e.data);
    this.currentUser = {
      id: e.data.id,
      firstName: e.data.firstName,
      lastName: e.data.lastName,
      age: e.data.age,
      nationalId: e.data.nationalId,
      education: e.data.education,
      birthDate: e.data.birthDate,
      profilePhoto: e.data.profilePhoto,
    };
  }
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'جدید',
          hint: 'افزودن کاربر جدید',
          type: 'default',
          onClick: () => {
            this.userService.setUser(new User());
            this.currentUser = new User();
            this.userService.setPopupMode({
              forAddUser: true,
              forEditUser: false,
              forViewUser: false,
            });
            this.positionOf = 'body';
            this.isPopupVisible = true;
          },
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'ویرایش',
          hint: 'ویرایش کاربر',
          onClick: () => {
            if (!this.currentUser.nationalId) {
              Swal.fire({
                text: 'کاربر مورد نظر را انتخاب کنید',
                icon: 'warning',
                confirmButtonText: 'تایید',
                backdrop: true,
                target: document.body,
                customClass: {
                  popup: 'custom-swal-popup',
                },
              });
              return;
            }
            this.userService.setPopupMode({
              forAddUser: false,
              forEditUser: true,
              forViewUser: false,
            });
            this.positionOf = 'body';
            this.isPopupVisible = true;
          },
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'حذف',
          hint: 'حذف کاربر',
          type: 'danger',
          onClick: () => {
            if (!this.currentUser.nationalId) {
              Swal.fire({
                text: 'کاربر مورد نظر را انتخاب کنید',
                icon: 'warning',
                confirmButtonText: 'تایید',
                backdrop: true,
                target: document.body,
                customClass: {
                  popup: 'custom-swal-popup',
                },
              });
              return;
            }
            Swal.fire({
              text: `آیا از حذف کاربر ${this.currentUser.firstName} ${this.currentUser.lastName} مطمئن هستید؟`,
              showCancelButton: true,
              confirmButtonText: 'بله',
              cancelButtonText: 'خیر',
              backdrop: true,
              target: document.body,
              customClass: {
                popup: 'custom-swal-popup',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                const index = this.users.findIndex((u) => u.id === this.currentUser.id);
                if (index !== -1) {
                  this.users.splice(index, 1);
                  localStorage.setItem(this.storageKey, JSON.stringify(this.users));
                  this.refreshDxGrid();
                  console.log('کاربر حذف شد:', this.currentUser);
                  this.userService.setUser(new User());
                  this.currentUser = new User();
                }
              }
            });
          },
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          text: 'مشاهده',
          hint: 'نمایش اطلاعات کاربر',
          onClick: () => {
            if (!this.currentUser.nationalId) {
              Swal.fire({
                text: 'کاربر مورد نظر را انتخاب کنید',
                icon: 'warning',
                confirmButtonText: 'تایید',
                backdrop: true,
                target: document.body,
                customClass: {
                  popup: 'custom-swal-popup',
                },
              });
              return;
            }
            this.popupMode = {
              forAddUser: false,
              forEditUser: false,
              forViewUser: true,
            };
            this.positionOf = 'body';
            this.isPopupVisible = true;
          },
        },
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentUser.profilePhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }
}
