import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RecipeService } from '../services/recipe-service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-recipe-editor',
	imports: [ReactiveFormsModule],
	templateUrl: './recipe-editor.html',
	styleUrl: './recipe-editor.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditor {
	formBuilder = inject(FormBuilder);
	recipeService = inject(RecipeService);
	recipeEditForm!: FormGroup;
	recipeImgSrc = signal("");
	instructionImgSrc: Map<string, string> = new Map();

	constructor() {
		this.recipeEditForm = this.formBuilder.group({
			name: ["", { validators: [Validators.required] }],
			image: ["", { validators: [Validators.required] }],
			servings: ["", { validators: [Validators.required] }],
			timeToMake: ["", { validators: [Validators.required] }],
			complexity: ["", { validators: [Validators.required] }],
			authorNotes: ["", { validators: [Validators.required] }],
			categories: this.formBuilder.array([]),
			ingredients: this.formBuilder.array([]),
			instructions: this.formBuilder.array([]),
		});
	}

	onRecipeImgChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				this.recipeImgSrc.set(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	// A FormArray getter metódusa a sablonhoz való könnyebb hozzáféréshez
	get categories(): FormArray {
		return this.recipeEditForm.get('categories') as FormArray;
	}
	addCategory() {
		this.categories.push(this.formBuilder.control(""));
	}
	removeCategory(index: number) {
		this.categories.removeAt(index);
	}


	get ingredients(): FormArray {
		return this.recipeEditForm.get('ingredients') as FormArray;
	}
	addIngredient(): void {
		const ingredientGroup = this.formBuilder.group({
			title: [""],
			ingredientList: this.formBuilder.array([])
		});
		this.ingredients.push(ingredientGroup);
	}
	removeIngredient(index: number): void {
		this.ingredients.removeAt(index);
	}
	getIngredientListAt(index: number): FormArray {
		return this.ingredients.at(index).get("ingredientList") as FormArray
	}
	addIngredientItem(index: number): void {
		this.getIngredientListAt(index).push(this.formBuilder.control(""));
	}
	removeIngredientItem(ingredientIndex: number, itemIndex: number): void {
		this.getIngredientListAt(ingredientIndex).removeAt(itemIndex);
	}
	

	get instructions(): FormArray {
		return this.recipeEditForm.get("instructions") as FormArray;
	}
	addInstruction(): void {
		const instructionGroup = this.formBuilder.group({
			text: ["", Validators.required],
			images: this.formBuilder.array([])
		});
		this.instructions.push(instructionGroup);
	}
	removeInstruction(index: number): void {
		const images = this.getImagesAt(index);
		for (let i = 0; i < images.length; i++) {
			this.instructionImgSrc.delete(index + "-" + i);
		}
		this.instructions.removeAt(index);
		
		const keysToUpdate: string[] = [];
		this.instructionImgSrc.forEach((value, key) => {
			const [instrIndex, imgIndex] = key.split('-').map(Number);
			if (instrIndex > index) {
				keysToUpdate.push(key);
			}
		});
		
		keysToUpdate.forEach(oldKey => {
			const [instrIndex, imgIndex] = oldKey.split('-').map(Number);
			const newKey = `${instrIndex - 1}-${imgIndex}`;
			const value = this.instructionImgSrc.get(oldKey);
			if (value) {
				this.instructionImgSrc.delete(oldKey);
				this.instructionImgSrc.set(newKey, value);
			}
		});
	}

	onInstructionImageSelected(event: Event, instructionIndex: number, imageIndex: number) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			const file = target.files[0];

			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					const value = reader.result as string;
					this.instructionImgSrc.set(`${instructionIndex}-${imageIndex}`, value);
				}
			};
			reader.readAsDataURL(file);
		}
	}
	getImagesAt(index: number): FormArray {
		return this.instructions.at(index).get("images") as FormArray
	}
	addImageInput(instructionIndex: number): void {
		this.getImagesAt(instructionIndex).push(this.formBuilder.control(""));
	}
	removeImageInput(instructionIndex: number, imageIndex: number): void {
		this.getImagesAt(instructionIndex).removeAt(imageIndex);
		
		this.instructionImgSrc.delete(`${instructionIndex}-${imageIndex}`);
		
		// Update keys for images that come after the removed one in the same instruction
		const keysToUpdate: string[] = [];
		this.instructionImgSrc.forEach((value, key) => {
			const [instrIndex, imgIndex] = key.split('-').map(Number);
			if (instrIndex === instructionIndex && imgIndex > imageIndex) {
				keysToUpdate.push(key);
			}
		});
		
		keysToUpdate.forEach(oldKey => {
			const [instrIndex, imgIndex] = oldKey.split('-').map(Number);
			const newKey = `${instrIndex}-${imgIndex - 1}`;
			const value = this.instructionImgSrc.get(oldKey);
			if (value) {
				this.instructionImgSrc.delete(oldKey);
				this.instructionImgSrc.set(newKey, value);
			}
		});
	}
}
