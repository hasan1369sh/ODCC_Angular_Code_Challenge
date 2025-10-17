import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userSubject: Observable<User | null> = this.user.asObservable();
  private isNewUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isNewUserSubject: Observable<boolean> = this.isNewUser.asObservable();
  setUser(data: User): void{
    this.user.next(data);
  }

  getUser(): User | null{
    return this.user.getValue()
  }

  setIsNewUser(flag: boolean): void{
    this.isNewUser.next(flag);
  }

  getIsNewUser(): boolean{
    return this.isNewUser.getValue();
  }
}
