import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alert } from '../../../shared/alert/alert';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, RouterLink, Alert],
	templateUrl: './login.html',
	styleUrl: './login.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
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
	public login() {
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
