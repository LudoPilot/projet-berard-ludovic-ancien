import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../stores/cart.state';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { RemoveFromCart } from '../stores/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Select(CartState.cartItems) cartItems$!: Observable<Product[]>;
  
  constructor(private store: Store) {}

  removeFromCart(productId: number) {
    this.store.dispatch(new RemoveFromCart(productId));
  }
}
