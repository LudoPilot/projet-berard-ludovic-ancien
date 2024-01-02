import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
	isLoading = false;
	error: string | null = null;
  
	constructor(private registrationService: RegistrationService) {}
  
	registerUser(form: NgForm) {
	  if (form.invalid) {
		return;
	  }
  
	  this.isLoading = true;
	  this.registrationService.register(form.value).subscribe(
		response => {
		  console.log('Inscription réussie', response);
		  this.isLoading = false;
		},
		error => {
		  console.error('Erreur lors de l\'inscription', error);
		  this.error = 'Une erreur est survenue lors de l\'inscription.';
		  this.isLoading = false;
		}
	  );
	}
}
