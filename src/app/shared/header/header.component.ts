import { Component} from '@angular/core';
import { CartService } from '../../services/cart.service'; // Import CartService
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // 👈 PHẢI CÓ
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router để điều hướng

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule], // Đưa CommonModule vào imports
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartItemCount: number = 0;
  isLoggedIn: boolean = false; // Biến kiểm tra trạng thái đăng nhập

  constructor(private cartService: CartService,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe vào BehaviorSubject để nhận thông báo khi số lượng sản phẩm thay đổi
    this.cartService.getState().subscribe(count => {
      this.cartItemCount = count; // Cập nhật số lượng sản phẩm trong giỏ hàng
    });
    this.authService.getLoginStatus().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Cập nhật số lượng sản phẩm trong giỏ hàng
    });
  }


  ngOnChanges() {
    console.log(this.cartItemCount);
  }

  logout() {
    this.authService.logout(); // Đăng xuất người dùng và xóa trạng thái trong localStorage
    this.isLoggedIn = false; // Cập nhật trạng thái đăng nhập
    this.router.navigate(['/']); // Chuyển hướng về trang chủ
  }
}
