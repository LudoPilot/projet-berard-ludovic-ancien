import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-product',
	standalone: false,
	imports: [HttpClientModule],
	templateUrl: './product.component.html',
	styleUrl: './product.component.css',
	providers: [ProductService],
  })
export class ProductComponent {
	@Input() productId?: number;

	product$: Observable<Product> | undefined;

	constructor(private productService: ProductService) {}

	ngOnInit() {
		if (this.productId) {
		  this.product$ = this.productService.getProductById(this.productId);
		}
	  }
}