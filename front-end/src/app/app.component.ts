import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from './product.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './stores/cart.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule, FormsModule, CatalogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit {
    title = 'Application TP5';
    productsAll: any[] = [];
    isLoggedIn = false;
    loginForm = { login: '', password: '' };
    searchTerm: string = '';
    searchResults: any[] = [];
    private searchTerms = new Subject<string>();

    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    constructor(
        private productService: ProductService,
        private apiService: ApiService,
        private searchService: SearchService
    ) { }

	// ngOnInit(): void {
	// 	// Vérifie si l'utilisateur est déjà connecté
	// 	this.checkAuthentication();
	// }
	
    ngAfterViewInit(): void {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => term ? this.searchService.search(term) : [])
        ).subscribe(results => {
            this.searchResults = results;
            console.log('Résultats de la recherche :', results);
        });
    }

    onSearch(): void {
        this.searchTerms.next(this.searchTerm);
		this.searchResults = []; // réinitialisation si on vide la barre après avoir écrit un terme
    }

    login(): void {
        const { login, password } = this.loginForm;

        this.apiService.loginClient(login, password).subscribe(
            (client) => {
                this.isLoggedIn = true;
                this.loadProducts();
            },
            (error) => {
                console.error('Erreur lors de la connexion :', error);
                this.loginForm = { login: '', password: '' };
            }
        );
    }

    private loadProducts(): void {
        this.productService.getProducts().subscribe(
            (data: any[]) => {
                this.productsAll = data;
            },
            (error) => {
                console.error('Erreur lors du chargement des produits :', error);
            }
        );
    }
}



