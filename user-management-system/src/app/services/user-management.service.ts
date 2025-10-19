import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PopupMode, User } from '../models/user-interfaces';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userSubject: Observable<User | null> = this.user.asObservable();
  private popupMode: BehaviorSubject<PopupMode | null> = new BehaviorSubject<PopupMode | null>(
    null
  );
  popupModeSubject: Observable<PopupMode | null> = this.popupMode.asObservable();
  setUser(data: User): void {
    this.user.next(data);
  }
  validateUser(user: User): boolean {
    const isValid =
      user.firstName &&
      user.firstName.trim().length > 0 &&
      user.lastName &&
      user.lastName.trim().length > 0 &&
      user.age &&
      +user.age > 0 &&
      user.nationalId &&
      user.nationalId.length === 10 &&
      user.education &&
      user.birthDate &&
      user.profilePhoto &&
      user.profilePhoto.trim().length > 0;

    if (!isValid) {
      Swal.fire({
        text: 'لطفا همه موارد خواسته شده را با مقادیر معتبر مقدار دهی کنید',
        icon: 'warning',
        confirmButtonText: 'تایید',
        backdrop: true,
        target: document.body,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      return false;
    }

    return true;
  }
  getUser(): User | null {
    return this.user.getValue();
  }

  setPopupMode(newMode: PopupMode): void {
    this.popupMode.next(newMode);
  }

  getPopupMode(): PopupMode | null {
    return this.popupMode.getValue();
  }
}
