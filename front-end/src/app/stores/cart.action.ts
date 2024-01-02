import { Product } from "../models/product.model";

export class AddToCart {
	static readonly type = '[Cart] Add To Cart';
	constructor(public payload: Product) { }
}

export class RemoveFromCart {
	static readonly type = '[Cart] Remove From Cart';
	constructor(public productId: number) { }
}