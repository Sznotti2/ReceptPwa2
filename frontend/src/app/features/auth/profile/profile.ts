import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../../shared/modal/modal';
import { animate, style, transition, trigger, query, group } from '@angular/animations';

@Component({
	selector: 'app-profile',
	imports: [ReactiveFormsModule, Modal],
	templateUrl: './profile.html',
	styleUrl: './profile.scss',
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
export class Profile {
	authService = inject(AuthService);
	cd = inject(ChangeDetectorRef);
	private router = inject(Router);
	formBuilder = inject(FormBuilder);

	// imgbb = inject(ImgbbService);
	imageSrc = signal<string>("");
	selectedImage = signal<File | null>(null); // ez lesz elküldve az imgbb-nek

	activeForm = signal<'profile' | 'verification' | 'changePassword'>('profile');
	
	userEmail = signal<string>("gmail.com"); //TODO: get email from user after @
	user!: User;
	editForm: FormGroup;
	verificationForm: FormGroup;
	changePasswordForm: FormGroup;
	constructor() {
		this.editForm = this.formBuilder.group({
			username: [""],
			bio: [""],
			password: [""],
			image: [""]
		});


		this.verificationForm = this.formBuilder.group({
			code1: [""],
			code2: [""],
			code3: [""],
			code4: [""],
			code5: [""],
			code6: [""]
		});


		this.changePasswordForm = this.formBuilder.group({
			currentPassword: [""],
			newPassword: [""]
		});
	}

	updateAccount() {
		//TODO: implement update account logic
	}
	verifyOTP() {
		this.activeForm.set('changePassword');
	}
	changePassword() {
		this.activeForm.set('profile');
	}
	showForm(form: 'profile' | 'verification' | 'changePassword') {
		this.activeForm.set(form);
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

	showModal = false;
	showDeleteModal() {
		this.showModal = true;
	}
	onModalConfirm() {
		this.showModal = false;
		// ide jön az API-hívás, pl. this.userService.deleteAccount()
	}
	onModalCancel() {
		this.showModal = false;
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
			this.verifyOTP();
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
		const next: HTMLInputElement | null = document.querySelector(`#code${focusIdx}`);
		if (next) next.focus();

		// ha minden mező valid, hívjuk
		if (this.verificationForm.valid) {
			this.verifyOTP();
		}
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
