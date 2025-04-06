import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // Dùng BehaviorSubject để quản lý trạng thái

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private numberItemInCart = new BehaviorSubject<number>(0); // Sử dụng BehaviorSubject để lưu số lượng sản phẩm trong giỏ hàng
  private cartItems: any[] = []; // Mảng lưu trữ các sản phẩm trong giỏ hàng

  constructor() {}

  // Cung cấp một Observable để các component có thể subscribe
  getState(): Observable<number> {
    return this.numberItemInCart.asObservable(); // Trả về Observable để các component có thể subscribe vào số lượng sản phẩm trong giỏ hàng
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  private updateItemCount(): void {
    const itemCount = this.cartItems.length
    this.numberItemInCart.next(itemCount); // Cập nhật số lượng sản phẩm trong BehaviorSubject
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
    
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    
    // Cập nhật lại số lượng sản phẩm sau khi thêm
    this.updateItemCount();
  }

  // Lấy tất cả các sản phẩm trong giỏ hàng
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Tính tổng giá trị giỏ hàng
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Lấy số lượng sản phẩm trong giỏ hàng
  getCartItemCount(): number {
    return this.numberItemInCart.getValue(); // Lấy giá trị hiện tại của BehaviorSubject
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    const productIndex = this.cartItems.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      this.cartItems.splice(productIndex, 1); // Xóa sản phẩm khỏi giỏ hàng
      this.updateItemCount(); // Cập nhật lại số lượng sau khi xóa
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateProductQuantity(productId: number, quantity: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product && quantity >= 0) {
      product.quantity = quantity; // Cập nhật số lượng sản phẩm
      this.updateItemCount(); // Cập nhật lại số lượng sản phẩm trong giỏ hàng
    }
  }
}
