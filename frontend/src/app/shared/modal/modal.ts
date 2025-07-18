import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-modal',
	imports: [],
	templateUrl: './modal.html',
	styleUrl: './modal.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None

})
export class Modal {
	title = input<string>('Megerősítés');
	confirm = output<void>();
	cancel = output<void>();

	showConfirmButton = input<boolean>(false);
	showCancelButton = input<boolean>(false);
}
