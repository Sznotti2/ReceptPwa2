import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss'
})
export class ThemeSwitcher {
	isOpen = signal(false);
	theme = signal('light');

	toggleTheme() {
		this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', this.theme());
	}

	toggleMenu() {
		this.isOpen.set(!this.isOpen());
	}

	// Ha nem a komponens elemeire kattintunk, akkor bezárjuk a lenyíló menüt.
	@HostListener('document:click', ['$event'])
	onClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.theme-switcher')) {
			this.isOpen.set(false);
		}
	}
}
