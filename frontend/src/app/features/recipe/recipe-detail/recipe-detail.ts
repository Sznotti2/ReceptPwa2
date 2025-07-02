import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe-service';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail {
	route = inject(ActivatedRoute);
	recipe = signal<any | null>(null);
	recipeServise = inject(RecipeService);

	constructor() {
		const recipeId = this.route.snapshot.params['id'];
		const recipeSignal = this.recipeServise.getRecipeBySlug(recipeId);
		this.recipe.set(recipeSignal());

		console.log(this.recipe());
	}
}
