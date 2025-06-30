import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
	private router = inject(Router);
	private authService = inject(AuthService);

	loginForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ["", { validators: [Validators.required] }],
			password: ["", { validators: [Validators.required] }],
		});
	}

	errorMessage = signal<string | null>(null);
	public login(): void {
		// if (this.loginForm.valid) {
		// 	const form = this.loginForm.value;
		// 	this.authService.login(form.email, form.password)
		// 		.subscribe({
		// 			next: () => {
		// 				this.router.navigateByUrl("/")
		// 			},
		// 			error: (error) => {
		// 				this.errorMessage.set(error.error.error);
		// 			}
		// 		});
		// } else {
		// 	console.log("Invalid form");
		// }
	}

	get email() {
		return this.loginForm.controls["email"];
	}
	get password() {
		return this.loginForm.controls["password"];
	}

	passwordVisible = signal(false);
	inputType = signal("password");
	revealPassword() {
		this.passwordVisible.set(!this.passwordVisible());
		this.inputType.set(this.passwordVisible() ? "text" : "password");
	}
}
