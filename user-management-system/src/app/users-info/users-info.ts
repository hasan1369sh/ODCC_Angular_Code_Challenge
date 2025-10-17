import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user-interfaces';
import { UserManagementService } from '../services/user-management.service';
import { DxDataGridComponent } from 'devextreme-angular';

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

  constructor(public userService: UserManagementService) {}

  ngOnInit() {
    this.loadUsers();
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

  onEdit = (e: any) => {
    this.dataGrid.instance.editRow(e.row.rowIndex);
  };

  onRowUpdated(e: any) {
    const updatedUser = e.data;
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      localStorage.setItem(this.storageKey, JSON.stringify(this.users));
      console.log('تغییرات کاربر ذخیره شد:', updatedUser);
      this.refreshDxGrid();
    }
  }

  onDelete = (e: any) => {
    const user = e.row.data;
    if (confirm(`آیا از حذف کاربر ${user.firstName} ${user.lastName} مطمئن هستید؟`)) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(this.users));
        this.refreshDxGrid();
        console.log('کاربر حذف شد:', user);
      }
    }
  };

  selectedUser(e: any) {
    this.userService.setUser(e.data);
    this.userService.setIsNewUser(false);
  }

}
