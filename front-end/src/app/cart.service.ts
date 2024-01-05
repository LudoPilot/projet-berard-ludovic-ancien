import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddToCart, RemoveFromCart } from './stores/cart.action';
import { CartState } from './stores/cart.state';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  // Ajouter un produit au panier
  addToCart(product: Product): void {
    this.store.dispatch(new AddToCart(product));
  }

  // Retirer un produit du panier
  removeFromCart(productId: number): void {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  // Obtenir les articles du panier
  getCartItems(): Observable<Product[]> {
    return this.store.select(CartState.cartItems);
  }

  // Obtenir le nombre total d'articles dans le panier
  getCartItemCount(): Observable<number> {
    return this.store.select(CartState.cartItemCount);
  }

  // Obtenir le total du panier
  getCartTotal(): Observable<number> {
    return this.store.select(CartState.cartTotal);
  }
}
