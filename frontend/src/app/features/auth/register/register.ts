import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

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
	authService = inject(Auth);

	registerForm: FormGroup;
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

		console.log("Register form submitted", this.registerForm.value);
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
