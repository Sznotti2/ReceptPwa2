import { Component, input, output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'app-modal',
	imports: [],
	templateUrl: './modal.html',
	styleUrl: './modal.scss'
})
export class Modal {
	// @Input() title = 'Megerősítés';
	// @Input() message = 'Biztos végrehajtod a műveletet?';
	// @Output() onConfirm = new EventEmitter<void>();
	// @Output() onCancel  = new EventEmitter<void>();

	title = input<string>('Megerősítés');
	contentHtml = input.required<SafeHtml>();
	confirm = output<void>();
	cancel = output<void>();

	showConfirmButton = input<boolean>(false);
	showCancelButton = input<boolean>(false);
}
