import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../models/recipe';

@Component({
	selector: 'app-recipe-list',
	imports: [RouterLink],
	templateUrl: './recipe-list.html',
	styleUrl: './recipe-list.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeList {
	recipes = input.required<Recipe[]>();
}
