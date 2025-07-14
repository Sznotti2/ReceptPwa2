import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { animate, style, transition, trigger, query, group } from '@angular/animations';

const hasOnlyLowercaseLetters = (control: AbstractControl): ValidationErrors | null => {
	return /[A-Z]/.test(control.value) ? null : { hasOnlyLowercaseLetters: true };
}
@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './register.html',
	styleUrl: './register.scss',
	animations: [
		trigger('paneChange', [
			transition('* => *', [
				query(':self', [
					style({ height: '{{startHeight}}px' })
				]),
				query(':enter', [
					style({ opacity: 0, scale: 0.9 })
				]),
				query(':leave', [
					style({ opacity: 1, scale: 1 }),
					animate('200ms ease-in-out', style({ opacity: 0, scale: 0.9 }))
				]),
				group([
					query(':self', [
						animate('200ms ease-in-out', style({ height: '*' }))
					]),
					query(':enter', [
						animate('200ms ease-in-out', style({ opacity: 1, scale: 1 }))
					])
				])
			], { params: { startHeight: 0 } })
		])
	]
})
export class Register {
	private document = inject(DOCUMENT);
	//TODO: get email from user after @
	userEmail = signal("gmail.com");

	registerForm: FormGroup;
	verificationForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		// this.registerForm = this.formBuilder.group({
		// 	name: ["", {
		// 		validators: [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
		// 	}],
		// 	email: ["", {
		// 		validators: [Validators.required, Validators.email],
		// 	}],
		// 	password: ["", {
		// 		validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32), hasOnlyLowercaseLetters],
		// 	}],
		// 	password2: ["", {
		// 		validators: [Validators.required],
		// 	}],
		// 	terms: [false, {
		// 		validators: [Validators.requiredTrue],
		// 	}]
		// });

		this.registerForm = this.formBuilder.group({
			name: [""],
			email: [""],
			password: [""],
			password2: [""],
			terms: [false]
		});

		this.verificationForm = this.formBuilder.group({
			digit1: [""],
			digit2: [""],
			digit3: [""],
			digit4: [""],
			digit5: [""],
			digit6: [""]
		});
	}

	errorMessage = signal("");
	register(): void {
		if (this.registerForm.valid) {
			this.toggle();
		}
	}

	verify() {
		if (this.verificationForm.valid) {
			this.toggle();
		}
	}

	isRegisterForm = signal(true);
	toggle() {
		this.isRegisterForm.set(!this.isRegisterForm());
	}


	/** Ezt löki át a template minden input eventnél */
	onInput(event: Event, nextInputId?: number) {
		const input = event.target as HTMLInputElement;
		// ha beírtál valamit, léptessünk
		if (input.value && nextInputId) {
			const next: HTMLElement | null = document.querySelector(`#${nextInputId}`);
			if (next) next.focus();
		}

		// ha minden mező valid, hívjuk a metódust
		if (this.verificationForm.valid) {
			this.verify();
		}
	}
	onOtpKeydown(event: KeyboardEvent, inputId: number) {
		const input = event.target as HTMLInputElement;
	}
	onPaste(event: ClipboardEvent) {
		event.preventDefault();
		const pasted = event.clipboardData?.getData('text/plain')?.trim() || '';
		// csak az első 6 érvényes karakter
		const chars = pasted.split('').filter(c => /\d/.test(c)).slice(0, 6);

		// beállítjuk a formControl-okat
		chars.forEach((ch, idx) => {
			this.verificationForm.get(`code${idx + 1}`)?.setValue(ch);
		});
		// töröljük a maradék mezőket, ha rövidebb volt a paste
		for (let i = chars.length; i < 6; i++) {
			this.verificationForm.get(`code${i + 1}`)?.setValue('');
		}

		// fókusz az utolsó beállított mező +1-re, vagy a hatodikra
		const focusIdx = chars.length < 6 ? chars.length + 1 : 6;
		const next: HTMLInputElement | null = document.querySelector(`#code${focusIdx}`);
		if (next) next.focus();

		// ha minden mező valid, hívjuk
		if (this.verificationForm.valid) {
			this.verify();
		}
	}

	passwordVisible = signal(false);
	inputType = signal("password");
	revealPassword() {
		this.passwordVisible.set(!this.passwordVisible());
		this.inputType.set(this.passwordVisible() ? "text" : "password");
	}

	get name() {
		return this.registerForm.controls["name"];
	}
	get email() {
		return this.registerForm.controls["email"];
	}
	get password() {
		return this.registerForm.controls["password"];
	}
	get password2() {
		return this.registerForm.controls["password2"];
	}
	get terms() {
		return this.registerForm.controls["terms"];
	}
}
