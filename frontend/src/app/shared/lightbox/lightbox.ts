import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-lightbox',
	imports: [],
	templateUrl: './lightbox.html',
	styleUrl: './lightbox.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('fade', [
			transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
			transition(':leave', [animate('200ms', style({ opacity: 0 }))])
		]),
		trigger('scale', [
			transition(':enter', [style({ transform: 'scale(0.8)', opacity: 0 }), animate('200ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))]),
			transition(':leave', [animate('200ms', style({ transform: 'scale(0.8)', opacity: 0 }))])
		])
	]
})
export class Lightbox {
	@Input() images: string[] = [];
	@Input() currentIndex = 0;
	@Output() closed = new EventEmitter<void>();
	visible = true;

	close() {
		this.visible = false;
		this.closed.emit();
	}

	prev(event: MouseEvent) {
		event.stopPropagation();
		this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
	}

	next(event: MouseEvent) {
		event.stopPropagation();
		this.currentIndex = (this.currentIndex + 1) % this.images.length;
	}
}
