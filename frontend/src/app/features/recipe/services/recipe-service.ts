import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../../environments/enviorment.prod';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

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

	getRecipeBySlug(slug: string): Signal<any | null> {
		const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(slug)}`;

		return toSignal(
			this.http
				.get<{ meals: any[] }>(url)
				.pipe(
					map(res => res.meals[0] ?? null)
				)
		);
	}

	editRecipe(recipe: Recipe): void {
	}

	deleteRecipe(id: string): void {
	}

}
