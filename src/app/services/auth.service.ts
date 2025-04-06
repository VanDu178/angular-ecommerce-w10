import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInKey = 'isLoggedIn'; // Key dùng để lưu trữ trạng thái đăng nhập
  private isLoggedIn = new BehaviorSubject<boolean>(this.getStoredLoginStatus()); // BehaviorSubject để theo dõi trạng thái đăng nhập

  constructor() {}

  // Trả về BehaviorSubject để các component có thể subscribe
  getLoginStatus() {
    return this.isLoggedIn.asObservable(); // Observable để các component subscribe vào
  }

  // Kiểm tra trạng thái đăng nhập từ localStorage
  private getStoredLoginStatus(): boolean {
    const storedStatus = localStorage.getItem(this.loggedInKey);
    return storedStatus === 'true'; // Trả về true nếu người dùng đã đăng nhập
  }

  // Đánh dấu người dùng đã đăng nhập và lưu trữ trạng thái vào localStorage
  login() {
    localStorage.setItem(this.loggedInKey, 'true'); // Lưu trạng thái đăng nhập
    this.isLoggedIn.next(true); // Cập nhật trạng thái đăng nhập trong BehaviorSubject
  }

  // Đánh dấu người dùng đã đăng xuất và xóa trạng thái đăng nhập
  logout() {
    localStorage.removeItem(this.loggedInKey); // Xóa trạng thái đăng nhập
    this.isLoggedIn.next(false); // Cập nhật trạng thái đăng nhập trong BehaviorSubject
  }
}
