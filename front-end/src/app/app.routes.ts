import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	{ path: 'register', component: RegistrationComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'catalog', component: CatalogComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }