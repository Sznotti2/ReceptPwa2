import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Modal } from '../../../shared/modal/modal';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, NgClass, Modal],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
	authService = inject(AuthService);
	cd = inject(ChangeDetectorRef);
	private router = inject(Router);

	// imgbb = inject(ImgbbService);
	imageSrc = signal<string>("");
	selectedImage = signal<File | null>(null); // ez lesz elküldve az imgbb-nek

	//TODO: get email from user after @
	userEmail = signal<string>("gmail.com");

	user!: User;
	editForm: FormGroup;
	verificationForm: FormGroup;
	changePasswordForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.editForm = this.formBuilder.group({
			username: ["", { validators: [Validators.required] }],
			bio: [""],
			password: ["", { validators: [Validators.required] }],
			image: [""],
		});


		this.verificationForm = this.formBuilder.group({
			code1: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code2: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code3: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code4: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code5: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }],
			code6: ["", { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] }]
		});


		this.changePasswordForm = this.formBuilder.group({
			currentPassword: ["", { validators: [Validators.required] }],
			newPassword: ["", { validators: [Validators.required] }],
			confirmPassword: ["", { validators: [Validators.required] }],
		});
	}

	ngOnInit(): void {
		// Ha a felhasználó már be van jelentkezve, töltsd fel az űrlapot az adataival
		// this.authService.user$.subscribe(user => {
		// 	if (user) {
		// 		this.editForm.patchValue({
		// 			username: user.name || "",
		// 			bio: user.bio || "",
		// 		});
		// 		this.imageSrc = user.profile_picture || "";
		// 	}
		// });
	}

	/**
   *@param event {EventObject} - the javascript change event
   *@param field {String} - the form field control name
   */
	onFileChange(event: Event) {
		const reader = new FileReader();

		const target = event.target as HTMLInputElement;
		if (target && target.files && target.files.length > 0) {
			this.selectedImage.set(target.files[0]);

			// const [file] = Array.from(target.files); // több kép esetén
			const file = target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.imageSrc.set(reader.result as string); // kép megjelenítéshez

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

	public onEdit(): void {
		if (this.editForm.valid) {
			const form = this.editForm.value;
		} else {
			console.log("Invalid form");
		}
	}

	showModal = false;
	onDelete() {
		this.showModal = true;
	}
	onModalConfirm() {
		this.showModal = false;
		// ide jön az API-hívás, pl. this.userService.deleteAccount()
	}
	onModalCancel() {
		this.showModal = false;
	}

	showInfocard = true;
	startVerification() {
		this.showInfocard = true;
	}
	/** Ezt löki át a template minden input eventnél */
	onInput(event: Event, nextInputId?: string) {
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
		alert("Verification code sent to your email. Please check your inbox.");
	}

	showchangePassword = true;
	onChangePassword() {
		this.showInfocard = true;
	}

	passwordVisible = signal(false);
	inputType = signal("password");
	revealPassword() {
		this.passwordVisible.set(!this.passwordVisible());
		this.inputType.set(this.passwordVisible() ? "text" : "password");
	}

	// Getters
	get username() {
		return this.editForm.controls["username"];
	}
	get bio() {
		return this.editForm.controls["bio"];
	}
	get password() {
		return this.editForm.controls["password"];
	}
	get image() {
		return this.editForm.controls["image"];
	}
}
