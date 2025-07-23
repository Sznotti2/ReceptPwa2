import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { animate, style, transition, trigger, query, group } from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { Alert } from '../../../shared/alert/alert';
import { AuthService } from '../services/auth.service';

const hasOnlyLowercaseLetters = (control: AbstractControl): ValidationErrors | null => {
	return /[A-Z]/.test(control.value) ? null : { hasOnlyLowercaseLetters: true };
}

@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, RouterLink, Alert],
	templateUrl: './register.html',
	styleUrl: './register.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('paneChange', [
			transition('* => void', []), // No animation when leaving page
			transition('void => *', []), // No animation when entering page
			transition('* => *', [
				query(':self', [
					style({ height: '{{startHeight}}px' })
				]),
				query(':enter', [
					style({ opacity: 0, scale: 0.9 })
				], { optional: true }),
				query(':leave', [
					style({ opacity: 1, scale: 1 }),
					animate('0.2s ease-in-out', style({ opacity: 0, scale: 0.9 }))
				], { optional: true }),
				group([
					query(':self', [
						animate('0.2s ease-in-out', style({ height: '*' }))
					]),
					query(':enter', [
						animate('0.2s ease-in-out', style({ opacity: 1, scale: 1 }))
					], { optional: true }),
				], { params: { startHeight: 0 } })
			])
		])
	]
})
export class Register {
	private document = inject(DOCUMENT);
	private router = inject(Router);
	authService = inject(AuthService);

	animationDisabled = signal(true);
	isRegisterForm = signal(true);
	
	userEmail = signal("gmail.com"); //TODO: get email from user after @
	errorMessage = signal("");
	otpErrorMessage = signal("");
	registerForm: FormGroup;
	verificationForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		// this.registerForm = this.formBuilder.group({
		// 	name: ["", {
		// 		validators: [Validators.required, Validators.minLength(3), Validators.maxLength(64)],
		// 	}],
		// 	email: ["", {
		// 		validators: [Validators.required, Validators.email],
		// 	}],
		// 	password: ["", {
		// 		validators: [Validators.required, Validators.minLength(6), Validators.maxLength(64), hasOnlyLowercaseLetters],
		// 	}],
		// 	terms: [false, {
		// 		validators: [Validators.requiredTrue],
		// 	}]
		// });
		// this.verificationForm = this.formBuilder.group({
		// 	digit1: ["", {
		// 		validators: [Validators.required, Validators.pattern(/^\d$/)],
		// 	}],
		// 	digit2: ["", {
		// 		validators: [Validators.required, Validators.pattern(/^\d$/)],
		// 	}],
		// 	digit3: ["", {
		// 		validators: [Validators.required, Validators.pattern(/^\d$/)],
		// 	}],
		// 	digit4: ["", {
		// 		validators: [Validators.required, Validators.pattern(/^\d$/)],
		// 	}],
		// 	digit5: ["", {
		// 		validators: [Validators.required, Validators.pattern(/^\d$/)],
		// 	}],
		// 	digit6: ["", {
		// 		validators: [Validators.required, Validators.pattern(/^\d$/)],
		// 	}]
		// });

		this.registerForm = this.formBuilder.group({
			name: [""],
			email: [""],
			password: [""],
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

	register(): void {
		if (this.registerForm.valid) {
			this.authService.register(this.registerForm.value)
				.subscribe({
					next: () => {
						this.isRegisterForm.set(!this.isRegisterForm());
					},
					error: (error) => {
						console.error("Registration failed:", error);
						this.errorMessage.set(`Registration failed. ${error.message}`);
					}
				});
		} else {
			this.errorMessage.set("Please fill in all required fields correctly.");
		}
	}

	verify() {
		if (this.verificationForm.valid) {
			this.authService.verify(this.verificationForm.value)
				.subscribe({
					next: () => {
						this.router.navigate(['/login']);
					},
					error: (error) => {
						console.error("Verification failed:", error);
						this.otpErrorMessage.set(`Verification failed. ${error.message}`);
					}
				});
		} else {
			this.otpErrorMessage.set("Please fill in all OTP fields correctly.");
		}
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
