import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
	authService = inject(Auth);
	cd = inject(ChangeDetectorRef);
	private router = inject(Router);

	// imgbb = inject(ImgbbService);
	imageSrc = "";
	selectedImage: File | null = null; // ez lesz elküldve az imgbb-nek

	user!: User;
	editForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.editForm = this.formBuilder.group({
			username: ["", { validators: [Validators.required] }],
			bio: [""],
			password: ["", { validators: [Validators.required] }],
			image: [""],
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
			this.selectedImage = target.files[0];

			// const [file] = Array.from(target.files); // több kép esetén
			const file = target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.imageSrc = reader.result as string; // kép megjelenítéshez

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

	public edit(): void {
		if (this.editForm.valid) {
			const form = this.editForm.value;
			// if (this.selectedImage !== null) {
			// 	this.imgbb.upload(this.selectedImage as File).subscribe({
			// 		next: (res) => {
			// 			console.log("Imagbb result", res.data.url);
			// 			this.authService.editUser(form.username, form.password, form.bio, res.data.url).subscribe({
			// 				next: () => console.log("Update successful"),
			// 				error: (err) => console.error("Update error", err)
			// 			});
			// 		},
			// 		error: (err) => console.error("Upload error", err)
			// 	});
			// } else if (this.imageSrc !== "") {
			// 	this.authService.editUser(form.username, form.password, form.bio, this.imageSrc).subscribe({
			// 		next: () => console.log("Update successful"),
			// 		error: (err) => console.error("Update error", err)
			// 	});
			// }
		} else {
			console.log("Invalid form");
		}
	}

	public delete() {
		this.authService.deleteUser().subscribe({
			next: (res) => this.router.navigateByUrl("/"),
			error: (err) => console.error("Delete error", err)
		});
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
