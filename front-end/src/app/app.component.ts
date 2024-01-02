import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
	title = 'Projet final';
	productsAll: any[] = [];
	isLoggedIn = false;
	loginForm = { login: '', password: '' };

	constructor(
		private productService: ProductService,
		private apiService: ApiService
	) { }

	ngOnInit(): void {
		// Vérifie si l'utilisateur est déjà connecté
		this.checkAuthentication();
	}

	// Fonction de soumission du formulaire de connexion
	login(): void {
		const { login, password } = this.loginForm;

		// Appelez votre service d'authentification pour vous connecter
		this.apiService.loginClient(login, password).subscribe(
			(client) => {
				// Connexion réussie
				this.isLoggedIn = true;
				// Chargez les produits après la connexion
				this.loadProducts();
			},
			(error) => {
				// Gérez les erreurs d'authentification ici
				console.error('Erreur lors de la connexion :', error);
				// Réinitialisez le formulaire
				this.loginForm = { login: '', password: '' };
			}
		);
	}

	// Vérifie si l'utilisateur est déjà authentifié
	private checkAuthentication(): void {
		// Vous pouvez implémenter votre propre logique ici
		// par exemple, vérifier si un jeton JWT est présent dans le stockage local
		// ou utiliser une autre méthode d'authentification de votre backend
	}

	// Chargez les produits une fois que l'utilisateur est authentifié
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


