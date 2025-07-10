import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { Test } from './test/test';

export const routes: Routes = [
	{
		path: "test",
		component: Test
	},
	{
		path: "recipe/:slug",
		loadComponent: () => import("./features/recipe/recipe-detail/recipe-detail").then(m => m.RecipeDetail),
		title: "Receptek"
	},
	{
		path: "recipe",
		loadComponent: () => import("./features/recipe/recipe-page/recipe-page").then(m => m.RecipePage),
		title: "Receptek"
	},
	{
		path: "blog/:slug",
		loadComponent: () => import("./features/blog/blog-detail/blog-detail").then(m => m.BlogDetail),
		title: "Receptek"
	},
	{
		path: "blog",
		loadComponent: () => import("./features/blog/blog-page/blog-page").then(m => m.BlogPage),
		title: "Blog"
	},
	{
		path: "about",
		loadComponent: () => import("./features/about-page/about-page").then(m => m.AboutPage),
		title: "Rólunk"
	},
	{
		path: "login",
		loadComponent: () => import("./features/auth/login/login").then(m => m.Login),
		title: "Bejelentkezés"
	},
	{
		path: "register",
		loadComponent: () => import("./features/auth/register/register").then(m => m.Register),
		title: "Regisztráció"
	},
	{
		path: "profile",
		loadComponent: () => import("./features/auth/profile/profile").then(m => m.Profile),
		title: "Profil"
	},
	{
		path: "",
		component: HomePage,
		title: "Recept PWA 2"
	},
	{
		path: "**",
		loadComponent: () => import("./features/not-found/not-found").then(m => m.NotFound),
		title: "404 - A keresett oldal nem található"
	}
];
