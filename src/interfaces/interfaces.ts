import { FormikHelpers } from "formik/dist/types";

export interface UserState {
	email: string | null;
	username: string | null;
	userId: string | null;
	isLoggedIn: boolean;
	favorites: string[];
	saved: string[];
}

export interface Recipe {
	id: string;
	title: string;
	description: string;
	ingredients: string[];
	instructions: string;
	image: string;
	category: string;
	cookingTime: number;
	rating: number;
	author: string
}

export type FormField = {
	name: keyof FormValues;
	type: string;
	label: string;
	autoComplete: string;
};

export type FormValues = {
	username?: string;
	email: string;
	password: string;
	confirmPassword?: string;
};

export interface AuthFormProps {
	title: string;
	initialValues: FormValues;
	formFields: FormField[];
	onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void | Promise<void>;
	validationSchema?: any;
	errorMessage?: string | null;
}

export interface LoggedInButtonsProps {
	handleClick: React.MouseEventHandler<HTMLButtonElement>;
	username: string | null;
}