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

	errorMessage = signal("");
	loginForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ["", { validators: [Validators.required] }],
			password: ["", { validators: [Validators.required] }],
		});
		// this.loginForm = this.formBuilder.group({
		// 	email: [""],
		// 	password: [""],
		// });
	}

	public login() {
		if (this.loginForm.valid) {
			this.authService.login(this.loginForm.value)
				.subscribe({
					next: () => {
						this.router.navigateByUrl("/")
					},
					error: (error) => {
						this.errorMessage.set(error.message);
					}
				});
		} else {
			this.errorMessage.set("Invalid form");
		}
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
