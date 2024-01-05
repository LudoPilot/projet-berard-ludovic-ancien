import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
    jwtToken: String = '';
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Exclure les requêtes d'inscription et de connexion de l'ajout du JWT
        const excludedEndpoints = ['/api/utilisateur/register', '/api/utilisateur/login'];
        if (!excludedEndpoints.some(url => req.url.includes(url)) && this.jwtToken) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${this.jwtToken}` },
            });
            console.log('Bearer renvoyé : ' + this.jwtToken);
        }

        return next.handle(req).pipe(
            tap((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    let enteteAuthorization = evt.headers.get('Authorization');
                    if (enteteAuthorization) {
                        const tab = enteteAuthorization.split(' ');
                        if (tab.length > 1) {
                            this.jwtToken = tab[1];
                            console.log('Bearer récupéré : ' + this.jwtToken);
                        }
                    }
                }
            })
        );
    }
}
