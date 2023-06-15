import { useCallback, useState } from 'react';
import { useAppSelector } from '../../redux/store/store';
import RecipeGrid from './RecipeGrid';
import { Container, SelectChangeEvent } from '@mui/material';
import { selectRecipes } from '../../redux/store/selectors';
import { useFilterRecipes } from '../../hooks/useFilterRecipes';
import { useSavedAndFavoriteFilter } from '../../hooks/useSavedAndFavoriteFilter';
import { useCookingTimeFilter } from '../../hooks/useCookingTimeFilter';
import { Recipe } from '../../interfaces/interfaces';
import { RecipeFilterControls } from './RecipeFilterControlsProps';

const SavedRecipesGrid: React.FC = () => {
	const recipes = useAppSelector(selectRecipes);
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');
	const [viewMode, setViewMode] = useState('all');
	const [cookingTime, setCookingTime] = useState(0);

	const categories = Array.from(new Set(recipes.map((recipe: Recipe) => recipe.category)));

	const cookingTimeFilter = useCookingTimeFilter(cookingTime);
	const savedAndFavoriteFilter = useSavedAndFavoriteFilter(viewMode);

	const filteredRecipes = useFilterRecipes(recipes, search, category, [
		useCallback(cookingTimeFilter, [cookingTimeFilter]),
		useCallback(savedAndFavoriteFilter, [savedAndFavoriteFilter])
	]);

	const handleCategoryChange = (event: SelectChangeEvent) => {
		setCategory(event.target.value as string);
	};
	const handleCookingTimeChange = (_event: any, newValue: number | number[]) => {
		setCookingTime(newValue as number);
	};

	return (
		<>
			<Container>
				<RecipeFilterControls
					search={search}
					setSearch={setSearch}
					category={category}
					setCategory={setCategory}
					cookingTime={cookingTime}
					setCookingTime={setCookingTime}
					categories={categories}
					handleCookingTimeChange={handleCookingTimeChange}
					handleCategoryChange={handleCategoryChange}
					setViewMode={setViewMode}
					currentRoute={'/savedrecipes'}
				/>
			</Container>
			<RecipeGrid recipes={filteredRecipes} currentRoute="/savedrecipes" />
		</>
	);
};

export default SavedRecipesGrid;