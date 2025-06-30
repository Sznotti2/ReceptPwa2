import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../models/recipe';
import { HttpResourceFn } from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  recipeResource = input.required<Recipe[]>();
}
