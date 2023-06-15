import * as Yup from 'yup';

export const addRecipeSchema = Yup.object().shape({
	title: Yup.string().required('Title is required.').min(3),
	description: Yup.string().required('Description is required.'),
	ingredients: Yup
		.array()
		.of(Yup.string().required('Ingredient is required'))
		.min(1, 'At least one ingredient is required'),
	instructions: Yup.string().required('Instructions are required.'),
	image: Yup
		.string()
		.test('image-extension', 'Invalid image URL extension', (value) => {
			if (!value) return true;
			const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
			const urlParts = value.split('.');
			const extension = urlParts[urlParts.length - 1].toLowerCase();
			return validExtensions.includes(`.${extension}`);
		})
		.url().required('Valid image URL is required.'),
	category: Yup.string().required('Category is required.'),
	cookingTime: Yup
		.number()
		.min(1, 'Cooking time should be at least 1 min')
		.required('Cooking time is required.'),
	rating: Yup
		.number()
		.min(0)
		.max(5, 'Rating must be between 0 and 5.')
		.required('Rating is required.'),
});
