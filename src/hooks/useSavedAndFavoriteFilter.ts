import { Recipe } from '../interfaces/interfaces'
import { useAppSelector } from '../redux/store/store';
import { selectUser } from '../redux/store/selectors';

export const useSavedAndFavoriteFilter = (viewMode: string) => {
	const user = useAppSelector(selectUser);

	return (recipe: Recipe) =>
		viewMode === 'all'
			? user.saved.includes(recipe.id) || user.favorites.includes(recipe.id)
			: viewMode === 'saved'
				? user.saved.includes(recipe.id)
				: user.favorites.includes(recipe.id);
};
