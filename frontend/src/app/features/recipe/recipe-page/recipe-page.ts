import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RecipeService } from '../services/recipe-service';
import { httpResource } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { RecipeList } from '../recipe-list/recipe-list';
import { DropdownSelect } from "../../../shared/dropdown-select/dropdown-select";

@Component({
	selector: 'app-recipe-page',
	imports: [RecipeList, DropdownSelect],
	templateUrl: './recipe-page.html',
	styleUrl: './recipe-page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipePage {
	recipeService = inject(RecipeService);
	searchTerm = signal('');

	fileResource = httpResource<any>(() => ({
		url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchTerm()}`,
		// reportProgress: true,
		responseType: 'json',
	}));

	recipes = computed(() => {
		const res = this.fileResource.value();
		if (!res?.meals) return [];
		return res.meals.map((m: any): Recipe => ({
			id: m.idMeal,
			name: m.strMeal,
			description: m.strInstructions,
			image: m.strMealThumb,
			categories: [m.strCategory].filter(Boolean),
			timeToMake:  Math.floor(Math.random()*60)+20,
			servings:    Math.floor(Math.random()*6)+1,
		}));
	});


	onSearch(event: Event) {
		const input = event.target as HTMLInputElement;
		this.searchTerm.set(input.value);
	}

	showFilterPanel = signal(false);
	toggleFilterPanel() {
		this.showFilterPanel.update(value => !value);
	}

	selectOptions = signal<string[]>([
		"Név szerint növekvő",
		"Név szerint csökkenő",
		"Legújabb elől",
		"Legrégebbi elől"
	]);
}
