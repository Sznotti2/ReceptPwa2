import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { AboutPage } from './features/about-page/about-page';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Profile } from './features/auth/profile/profile';
import { NotFound } from './features/not-found/not-found';
import { RecipePage } from './features/recipe/recipe-page/recipe-page';
import { BlogPage } from './features/blog/blog-page/blog-page';
import { RecipeEditor } from './features/recipe/recipe-editor/recipe-editor';

export const routes: Routes = [
	{
		path: "recipe/:slug",
		title: "Receptek",
		loadComponent: () => import("./features/recipe/recipe-detail/recipe-detail").then(m => m.RecipeDetail)
	},
	{
		path: "edit/recipe",
		title: "Recept szerkesztése",
		component: RecipeEditor
	},
	{
		path: "recipe",
		title: "Receptek",
		component: RecipePage
	},
	{
		path: "blog/:slug",
		loadComponent: () => import("./features/blog/blog-detail/blog-detail").then(m => m.BlogDetail),
		title: "Receptek"
	},
	{
		path: "blog",
		title: "Blog",
		component: BlogPage
	},
	{
		path: "about",
		title: "Rólunk",
		component: AboutPage
	},
	{
		path: "login",
		title: "Bejelentkezés",
		component: Login
	},
	{
		path: "register",
		title: "Regisztráció",
		component: Register
	},
	{
		path: "profile",
		title: "Profil",
		component: Profile
	},
	{
		path: "",
		component: HomePage,
		title: "Recept PWA 2"
	},
	{
		path: "**",
		title: "404 - A keresett oldal nem található",
		component: NotFound
	}
];
