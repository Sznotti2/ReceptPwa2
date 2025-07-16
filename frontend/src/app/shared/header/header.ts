import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-header',
	imports: [RouterLink, RouterLinkActive, CommonModule],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
	// authService = inject(AuthService);

}
