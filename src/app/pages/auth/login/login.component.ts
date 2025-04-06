import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Hỗ trợ ngModel
import { MatCardModule } from '@angular/material/card'; // Hỗ trợ mat-card
import { MatFormFieldModule } from '@angular/material/form-field'; // Hỗ trợ mat-form-field
import { MatInputModule } from '@angular/material/input'; // Hỗ trợ matInput
import { MatButtonModule } from '@angular/material/button'; // Hỗ trợ mat-button
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule, // Để sử dụng router.navigate
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email === 'phamvandu77tphcm@gmail.com' && this.password === '123') {
      this.authService.login();
      alert('Đăng nhập thành công!');
      this.router.navigate(['/']);
    } else {
      alert('Email hoặc mật khẩu sai!');
    }
  }
}