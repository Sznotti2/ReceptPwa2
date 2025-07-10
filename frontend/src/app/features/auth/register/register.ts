import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

const hasOnlyLowercaseLetters = (control: AbstractControl): ValidationErrors | null => {
	return /[A-Z]/.test(control.value) ? null : { hasOnlyLowercaseLetters: true };
}
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
	router = inject(Router);
	authService = inject(AuthService);

	//TODO: get email from user after @
	userEmail = signal<string>("gmail.com");
	showRegisterForm = signal<boolean>(true);

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
			code1: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code2: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code3: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code4: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code5: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code6: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }]
		});
	}

	errorMessage = signal<string>("");
	public register(): void {
		if (this.registerForm.valid) {
			this.authService.register(this.registerForm.value)
				.subscribe({
					next: () => {
						this.router.navigateByUrl("/login")
					},
					error: (error) => {
						this.errorMessage = error.error.error;
					}
				});
		}
		
		this.showRegisterForm.set(false);

		console.log("Register form submitted", this.registerForm.value);
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
			this.onVerify();
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
		const next: HTMLInputElement|null = document.querySelector(`#code${focusIdx}`);
		if (next) next.focus();

		// ha minden mező valid, hívjuk
		if (this.verificationForm.valid) {
		this.onVerify();
		}
	}
	onVerify() {
		// alert("Verification code sent to your email. Please check your inbox.");
		this.showRegisterForm.set(true);
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
