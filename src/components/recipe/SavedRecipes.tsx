import { useCallback, useState } from 'react';
import { useAppSelector } from '../../redux/store/store';
import RecipeGrid from './RecipeGrid';
import { Button, ButtonGroup, Container, SelectChangeEvent } from '@mui/material';
import { selectRecipes } from '../../redux/store/selectors';
import { useFilterRecipes } from '../../hooks/useFilterRecipes';
import { useSavedAndFavoriteFilter } from '../../hooks/useSavedAndFavoriteFilter';
import { useCookingTimeFilter } from '../../hooks/useCookingTimeFilter';
import { Recipe } from '../../interfaces/interfaces';
import { RecipeFilterControls } from './RecipeFilterControlsProps';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'

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
				/>
				<ButtonGroup>
					<Button onClick={() => setViewMode('all')} startIcon={<AllInclusiveIcon />}>All</Button>
					<Button onClick={() => setViewMode('saved')} startIcon={<BookmarkIcon />}>Saved</Button>
					<Button onClick={() => setViewMode('favorites')} startIcon={<FavoriteIcon />}>Favorites</Button>
				</ButtonGroup>
			</Container>
			<RecipeGrid recipes={filteredRecipes} currentRoute="/savedrecipes" />
		</>
	);
};

export default SavedRecipesGrid;