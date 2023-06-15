import { FormField } from "../../../interfaces/interfaces";

export const signInFields: FormField[] = [
	{ name: 'email', type: 'text', label: 'Email', autoComplete: 'email' },
	{ name: 'password', type: 'password', label: 'Password', autoComplete: 'current-password' }
];