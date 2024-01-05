import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	map,
	tap,
	switchMap,
} from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private http: HttpClient) { }

	search(term: string): Observable<any[]> {
		if (term === '') {
			return of([]);
		}

		const searchUrl = environment.backendCatalogueSearch.replace('{filtre}', term);
		console.log('Searching for:', term);
		return this.http.get<any[]>(searchUrl).pipe(
			tap(response => {
				console.log('Réponse du backend :', response);
			}),
			catchError(() => {
				return of([]);
			})
		);
	}

}