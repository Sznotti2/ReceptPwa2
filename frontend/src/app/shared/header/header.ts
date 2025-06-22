import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgClass, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
	// authService = inject(AuthService);
	isOpen = false;

	ngOnInit(): void {
	}

	logout() {
		// this.authService.logout().subscribe(() => {
		// 	console.log("logged out");
		// });
	}

	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
}
