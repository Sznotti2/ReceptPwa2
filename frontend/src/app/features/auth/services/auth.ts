import { inject, Injectable, signal } from '@angular/core';
import { User, UserLogin, UserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class Auth {
	http = inject(HttpClient);
	// imgbbService = inject(ImgbbService);
	apiUrl = 'http://localhost:5000/api/user';

	user = signal<User | null>(null);

	register(user: UserRegister): Observable<any> {
		return this.http.post(
			this.apiUrl + "/register",
			{ user }
		);
	}

	login(user: UserLogin): Observable<any> {
		return this.http.post<User>(
			this.apiUrl + "/login",
			{ user }
		).pipe(map((response: User) => {
			this.user.set(response);
		}));
	}

	logout(): Observable<any> {
		this.user.set(null);

		return this.http.post(
			this.apiUrl + `/logout`,
			{}
		);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(
			this.apiUrl + `/`,
			{ user }
		);
	}

	deleteUser(): Observable<any> {
		this.user.set(null);

		return this.http.delete(
			this.apiUrl + `/`,
			{}
		);
	}
}
