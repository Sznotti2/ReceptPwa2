import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-alert',
	imports: [],
	templateUrl: './alert.html',
	styleUrl: './alert.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Alert {

}
