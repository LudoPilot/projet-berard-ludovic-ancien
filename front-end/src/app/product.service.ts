import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private productsUrl = 'assets/product-list.json';

	constructor(private http: HttpClient) { }

	getProducts(): Observable<any[]> {
		return this.http.get<any[]>(this.productsUrl);
	}

	getProductById(productId: number): Observable<any> {
		const url = `${this.productsUrl}?id=${productId}`;
		return this.http.get<any>(url);
	  }
}