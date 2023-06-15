import { SelectChangeEvent } from "@mui/material/Select";
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

export interface RecipeGridProps {
	recipes: Recipe[];
	currentRoute?: string
}

export interface SearchProps {
	search: string;
	setSearch: (search: string) => void;
}

export interface CategoryProps {
	category: string;
	categories: string[];
	handleCategoryChange: (event: SelectChangeEvent) => void;
}

export interface RecipeCardProps {
	recipe: Recipe;
	currentRoute?: string;
}

export interface RecipeDetailsProps {
	recipe: Recipe;
}

export interface RecipeFilterControlsProps {
	search: string;
	setSearch: (value: string) => void;
	category: string;
	setCategory: (value: string) => void;
	cookingTime: number;
	setCookingTime: (value: number) => void;
	categories: string[];
	handleCookingTimeChange: (_event: any, newValue: number | number[]) => void;
	handleCategoryChange: (event: SelectChangeEvent) => void;
	setViewMode?: (value: string) => void;
	currentRoute?: string
}