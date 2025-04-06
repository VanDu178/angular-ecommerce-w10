import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductItemComponent } from '../../shared/product-item/product-item.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    ProductItemComponent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products:{ id: number, name: string, description: string, price: number, image: string, stock: number }[] = [
    {
      id: 1,
      name: 'Cà Rốt',
      description: 'Cà rốt tươi, ngọt và giòn, giàu vitamin A.',
      price: 1.99,
      image: 'https://product.hstatic.net/200000423303/product/ca-rot-huu-co_051657cb99144443bac8015f6dd34dae_1024x1024.jpg',
      stock: 0
    },
    {
      id: 2,
      name: 'Khoai Tây',
      description: 'Khoai tây tươi ngon, phù hợp cho nhiều món ăn.',
      price: 2.49,
      image: 'https://cdn.medigoapp.com/product/tac_dung_cua_khoai_tay_la_gi_d70d70a8c1.jpg',
      stock: 5
    },
    {
      id: 3,
      name: 'Bí Đỏ',
      description: 'Bí đỏ tươi, ngọt mát và dễ chế biến.',
      price: 3.99,
      image: 'https://www.vinaorganic.com/wp-content/uploads/2016/07/cong-dung-cua-bi-do.jpg',
      stock: 5
    },
    {
      id: 4,
      name: 'Cải Xoăn',
      description: 'Cải xoăn tươi ngon, giàu chất xơ và vitamin.',
      price: 4.29,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7GOxL5rO_mEjNsSJitndr2LqD5MNCmIM63g&s',
      stock: 5
    },
    {
      id: 5,
      name: 'Cà Rốt',
      description: 'Cà rốt tươi, ngọt và giòn, giàu vitamin A.',
      price: 1.99,
      image: 'https://product.hstatic.net/200000423303/product/ca-rot-huu-co_051657cb99144443bac8015f6dd34dae_1024x1024.jpg',
      stock: 5
    },
    {
      id: 6,
      name: 'Khoai Tây',
      description: 'Khoai tây tươi ngon, phù hợp cho nhiều món ăn.',
      price: 2.49,
      image: 'https://cdn.medigoapp.com/product/tac_dung_cua_khoai_tay_la_gi_d70d70a8c1.jpg',
      stock: 5
    },
    {
      id: 7,
      name: 'Bí Đỏ',
      description: 'Bí đỏ tươi, ngọt mát và dễ chế biến.',
      price: 3.99,
      image: 'https://www.vinaorganic.com/wp-content/uploads/2016/07/cong-dung-cua-bi-do.jpg',
      stock: 5
    },
    {
      id: 8,
      name: 'Cải Xoăn',
      description: 'Cải xoăn tươi ngon, giàu chất xơ và vitamin.',
      price: 4.29,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7GOxL5rO_mEjNsSJitndr2LqD5MNCmIM63g&s',
      stock: 5
    },
    {
      id: 9,
      name: 'Bí Đỏ',
      description: 'Bí đỏ tươi, ngọt mát và dễ chế biến.',
      price: 3.99,
      image: 'https://www.vinaorganic.com/wp-content/uploads/2016/07/cong-dung-cua-bi-do.jpg',
      stock: 5
    },
    {
      id: 10,
      name: 'Cải Xoăn',
      description: 'Cải xoăn tươi ngon, giàu chất xơ và vitamin.',
      price: 4.29,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7GOxL5rO_mEjNsSJitndr2LqD5MNCmIM63g&s',
      stock: 5
    }
  ];

  breakpoint: number = 3;
  isLoading: boolean = true;
  skeletonItems = Array(6);
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  filteredProducts: { id: number; name: string; description: string; price: number; image: string; stock: number }[] = this.products;

  private searchSubject = new BehaviorSubject<string>('');

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.setBreakpoint(window.innerWidth);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.authService.getLoginStatus().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    // Lắng nghe sự thay đổi của từ khóa tìm kiếm
    this.searchSubject
      .pipe(
        debounceTime(500), // Đợi 500ms trước khi thực hiện tìm kiếm
        switchMap((query) => this.searchProducts(query)) // Lọc sản phẩm theo tên
      )
      .subscribe((products) => {
        this.filteredProducts = products; // Gán giá trị đã lọc
      });
  }

  onResize(event: any) {
    this.setBreakpoint(event.target.innerWidth);
  }

  setBreakpoint(width: number) {
    if (width <= 600) {
      this.breakpoint = 1;
    } else if (width <= 960) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }

  onSearch() {
    this.searchSubject.next(this.searchQuery); // Gửi từ khóa tìm kiếm đến BehaviorSubject
  }

  onAddToCart(product: any) {
    if (this.isLoggedIn) {
      this.cartService.addToCart(product);
    } else {
      alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
    }
  }

  // Hàm tìm kiếm sản phẩm theo tên với kiểu trả về rõ ràng
  searchProducts(query: string): Observable<{ id: number; name: string; description: string; price: number; image: string; stock: number }[]> {
    if (!query) {
      return of(this.products); // Trả về Observable chứa tất cả sản phẩm
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = this.products.filter((product) => product.name.toLowerCase().includes(lowerCaseQuery));
    return of(filtered); // Trả về Observable chứa danh sách sản phẩm đã lọc
  }
}
