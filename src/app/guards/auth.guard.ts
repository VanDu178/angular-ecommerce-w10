// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authService.getLoginStatus().pipe(take(1)).subscribe(isLoggedIn => {
        if (isLoggedIn) {
          observer.next(true); // Nếu đã đăng nhập, cho phép truy cập
        } else {
          alert('Bạn cần đăng nhập để truy cập trang này!');
          this.router.navigate(['/']); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
          observer.next(false);
        }
      });
    });
  }
}
