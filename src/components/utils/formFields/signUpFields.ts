import { FormField } from "../../../interfaces/interfaces";

export const signUpFields: FormField[] = [
	{ name: 'username', type: 'text', label: 'Username', autoComplete: 'username' },
	{ name: 'email', type: 'text', label: 'Email', autoComplete: 'email' },
	{ name: 'password', type: 'password', label: 'Password', autoComplete: 'new-password' },
	{ name: 'confirmPassword', type: 'password', label: 'Confirm Password', autoComplete: 'new-password' }
];