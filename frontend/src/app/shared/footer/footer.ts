import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Modal } from '../modal/modal';

@Component({
	selector: 'app-footer',
	imports: [Modal],
	templateUrl: './footer.html',
	styleUrl: './footer.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
	showModal = signal<boolean>(false);
	openModal() {
		this.showModal.set(true);
	}
	closeModal() {
		this.showModal.set(false);
	}
}
