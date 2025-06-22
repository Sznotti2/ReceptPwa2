export interface User {
	name: string;
	email: string;
	profilePicture?: string;
	bio?: string;
	role?: 'admin' | 'user' | 'author';
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserRegister {
	name: string;
	email: string;
	password: string;
	password2: string;
	terms: boolean;
}

export interface UserLogin {
	name: string;
	password: string;
}