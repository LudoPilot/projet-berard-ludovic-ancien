import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Store } from '@ngxs/store';
import { Product } from '../models/product.model';
import { AddToCart } from '../stores/cart.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
	products: any[] = [];

	constructor(private productService: ProductService, private store: Store) {}
  
	addToCart(product: Product) {
		this.store.dispatch(new AddToCart(product));
	  }

	ngOnInit(): void {
	  this.productService.getProducts().subscribe((products) => {
		console.log('Données reçues du service :', products);
		this.products = products;
	  });
	}
}
