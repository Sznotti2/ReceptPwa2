import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
	// {
	// 	path: "recipe",
	// 	loadComponent: () => import("./features/recipe/recipe").then(m => m.Recipe),
	// 	title: "Receptek"
	// },
	// {
	// 	path: "blog",
	// 	loadComponent: () => import("./features/blog/blog").then(m => m.Blog),
	// 	title: "Blog"
	// },
	// {
	// 	path: "about",
	// 	loadComponent: () => import("./features/about/about").then(m => m.About),
	// 	title: "Rólunk"
	// },
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
		component: Home,
		title: "Recept PWA 2"
	},
	{
		path: "**",
		loadComponent: () => import("./features/not-found/not-found").then(m => m.NotFound),
		title: "404 - A keresett oldal nem található"
	}
];
