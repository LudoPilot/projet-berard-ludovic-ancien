import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from './models/client.model';
import { Product } from './models/product.model';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) { }

	public loginClient(login: string, password: string): Observable<Client> {
		let data: String;
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
			}),
		};
		data = 'login=' + login + '&password=' + password;
		return this.http.post<Client>(
			environment.backendLoginClient,
			data,
			httpOptions
		).pipe(
            tap(response => {
                if (response) { // Assurez-vous que la réponse indique un succès
                    this.isLoggedInSubject.next(true);
                }
            })
        );
	}

	public getCatalog(): Observable<Product[]> {
		return this.http.get<Product[]>(environment.backendCatalogue);
	}

    public isLoggedInObservable(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }

    public setLoggedIn(isLoggedIn: boolean): void {
        this.isLoggedInSubject.next(isLoggedIn);
    }

    // Ajoutez une méthode pour la déconnexion si nécessaire
}
