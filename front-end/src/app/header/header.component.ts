import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.apiService.isLoggedInObservable().subscribe(
            isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            }
        );
    }
}
