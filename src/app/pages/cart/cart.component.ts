import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Cung cấp ngIf, ngFor, currency pipe
import { MatCardModule } from '@angular/material/card'; // Hỗ trợ mat-card
import { MatListModule } from '@angular/material/list'; // Hỗ trợ mat-list
import { MatButtonModule } from '@angular/material/button'; // Hỗ trợ mat-button
import { CartService } from '../../services/cart.service'; // Import CartService
import { CartItemComponent } from '../../shared/cart-item/cart-item.component'; // Import CartItemComponent

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    CartItemComponent,
  ],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    console.log('Dữ liệu giỏ hàng:', this.cartItems);
  }
}