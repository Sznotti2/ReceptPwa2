import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, input, signal, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-dropdown-select',
	imports: [CommonModule],
	templateUrl: './dropdown-select.html',
	styleUrl: './dropdown-select.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => DropdownSelect)
		}
	]
})
export class DropdownSelect {
	// A komponens bemeneti paraméterei: placeholder szöveg és az opciók listája
	placeholder = input<string>('Select an option');
	options = input.required<string[]>();

	// A kiválasztott érték változásának jelezése az esetleges szülő komponens felé
	@Output() selectionChange = new EventEmitter<string>();

	selectedOption = signal<string>("");
	isOpen = signal<boolean>(false);

	private onChange: (value: string) => void = () => { };
	private onTouched: () => void = () => { };

	constructor(private eRef: ElementRef) { }

	// A dropdown állapotának váltása (nyitás/zárás)
	toggleDropdown(): void {
		this.isOpen.update((prev) => !prev);
	}

	// Opciok közül egy elem kiválasztása: ha az elem már aktív, visszaállítja a placeholder-t
	onOptionClick(event: Event, option: string): void {
		event.preventDefault();
		if (this.selectedOption() === option) {
			this.selectedOption.set("");
			this.selectionChange.emit('');
			this.onChange(''); // értesítjük a formot az értékváltozásról
		} else {
			this.selectedOption.set(option);
			this.selectionChange.emit(option);
			this.onChange(option);
		}
		this.isOpen.set(false);
		this.onTouched();
	}

	// Dokumentumklikk figyelése: ha a kattintás nem a komponens belsejéből érkezik, lezárja a dropdown-t
	@HostListener('document:click', ['$event'])
	handleClickOutside(event: Event): void {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.isOpen.set(false);
		}
	}

	// ControlValueAccessor implementációja:
	writeValue(value: string): void {
		this.selectedOption.set(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		// Itt kezelheted, ha szükséges a disable állapotot
	}
}
