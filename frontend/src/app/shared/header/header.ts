import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

@Component({
	selector: 'app-header',
	imports: [RouterLink, RouterLinkActive, ThemeSwitcher],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
	// authService = inject(AuthService);

}
