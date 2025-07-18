import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
	selector: 'app-alert',
	imports: [],
	templateUrl: './alert.html',
	styleUrl: './alert.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Alert {
	message = input.required<string>();
	type = input<"info" | "warning" | "error" | "success">('error');
	icon = computed(() => {
		switch (this.type()) {
			case 'info':
				return 'info';
			case 'warning':
				return 'warning';
			case 'error':
				return 'cancel';
			case 'success':
				return 'check_circle';
			default:
				return 'cancel';
		}
	});
}
