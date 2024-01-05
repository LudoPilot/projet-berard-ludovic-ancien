import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../models/product.model';
import { AddToCart, RemoveFromCart } from './cart.action';
import { Injectable } from '@angular/core';

export interface CartStateModel {
	cartItems: Product[];
}

@State<CartStateModel>({
	name: 'cart',
	defaults: {
		cartItems: [],
	},
})

@Injectable()
export class CartState {
	@Selector()
	static cartItems(state: CartStateModel) {
		return state.cartItems;
	}

	@Action(AddToCart)
	addToCart(
		{ getState, patchState }: StateContext<CartStateModel>,
		{ payload }: AddToCart
	) {
		const state = getState();
		patchState({
			cartItems: [...state.cartItems, payload],
		});
	}

	@Action(RemoveFromCart)
	removeFromCart(
		{ getState, patchState }: StateContext<CartStateModel>,
		{ productId }: RemoveFromCart
	) {
		const state = getState();
		const updatedCartItems = state.cartItems.filter(
			(item) => item.id !== productId
		);
		patchState({
			cartItems: updatedCartItems,
		});
	}

	@Selector()
	static cartItemCount(state: CartStateModel) {
		return state.cartItems.length;
	}

	@Selector()
	static cartTotal(state: CartStateModel) {
		return state.cartItems.reduce((total, item) => total + item.price, 0);
	}
}