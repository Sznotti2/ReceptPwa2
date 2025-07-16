import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe-service';
import { CommentsComponent } from '../../../shared/comments/comments';

@Component({
	selector: 'app-recipe-detail',
	imports: [CommentsComponent],
	templateUrl: './recipe-detail.html',
	styleUrl: './recipe-detail.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
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
