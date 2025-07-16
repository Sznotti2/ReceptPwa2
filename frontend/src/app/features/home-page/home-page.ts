import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home-page',
	imports: [RouterLink],
	templateUrl: './home-page.html',
	styleUrl: './home-page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
	user = inject(AuthService).user;

	onMobile(): boolean {
		return window.innerWidth <= 768;
	}
	onTablet(): boolean {
		return window.innerWidth > 768 && window.innerWidth <= 1024;
	}

	startLoading(event: MouseEvent): void {
		const button = event.currentTarget as HTMLButtonElement;
		button.classList.toggle('loading');
	}
}
