import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe-service';
import { Lightbox } from "../../../shared/lightbox/lightbox";

@Component({
  selector: 'app-recipe-detail',
  imports: [Lightbox],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail {
	route = inject(ActivatedRoute);
	recipe = signal<any | null>(null);
	recipeServise = inject(RecipeService);

	imgs: string[] = [
		'https://picsum.photos/200/300?random=1',
		'https://picsum.photos/200/300?random=2',
		'https://picsum.photos/200/300?random=3',
		'https://picsum.photos/200/300?random=4',
	];

	constructor() {
		const recipeId = this.route.snapshot.params['slug'];

		const recipeSignal = this.recipeServise.getRecipeBySlug(recipeId);
		effect(() => this.recipe.set(recipeSignal()));
	}
}
