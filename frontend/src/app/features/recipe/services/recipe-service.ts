import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../../environments/enviorment.prod';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	http = inject(HttpClient);
	// apiUrl = environment.apiUrl + 'recipe';

	recipeResource = httpResource<any>(() => ({
		url: "https://www.themealdb.com/api/json/v1/1/",
		method: 'GET',
		// headers: {
		// 	'Content-Type': 'application/json',
		// },
		// params: {
		// 	'fast': 'yes',
		// },
		// reportProgress: true,
		// withCredentials: true,
		// transferCache: true,
		// keepalive: true,
	}));

	addRecipe(recipe: Recipe): void {
	}

	getRecipeBySlug(slug: string): Signal<any> {
		let fileRes = httpResource<any>(() => ({
			url: `www.themealdb.com/api/json/v1/1/lookup.php?i=${slug}`,
			method: 'GET',
			responseType: 'json'
		}));

		let recipe = computed(() => {
			const res = fileRes.value();
			if (!res?.meals) return [];
			return res.meals;
		});

		return recipe;
	}

	editRecipe(recipe: Recipe): void {
	}

	deleteRecipe(id: string): void {
	}

}
