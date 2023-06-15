import { useState, useEffect, useCallback } from 'react';
import { Box, Container, SelectChangeEvent } from '@mui/material';
import { fetchRecipes } from '../../redux/slices/recipesSlice';

import { Recipe } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';

import RecipeGrid from './RecipeGrid';
import { selectRecipes } from '../../redux/store/selectors';
import { useFilterRecipes } from '../../hooks/useFilterRecipes';
import { useCookingTimeFilter } from '../../hooks/useCookingTimeFilter';
import { RecipeFilterControls } from './RecipeFilterControlsProps';

const RecipesGrid: React.FC = () => {
	const dispatch = useAppDispatch();
	const recipes = useAppSelector(selectRecipes);

	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');
	const [cookingTime, setCookingTime] = useState(0);

	const cookingTimeFilter = useCookingTimeFilter(cookingTime)
	const categories = Array.from(new Set(recipes.map((recipe: Recipe) => recipe.category)));

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	const handleCookingTimeChange = (_event: any, newValue: number | number[]) => {
		setCookingTime(newValue as number);
	};

	const filteredRecipes = useFilterRecipes(recipes, search, category, [
		useCallback(cookingTimeFilter, [cookingTimeFilter])
	]);

	const handleCategoryChange = (event: SelectChangeEvent) => {
		setCategory(event.target.value as string);
	};

	return (
		<Box>
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
					handleCategoryChange={handleCategoryChange} />
			</Container>
			<RecipeGrid recipes={filteredRecipes} />
		</Box>
	);
};

export default RecipesGrid;
