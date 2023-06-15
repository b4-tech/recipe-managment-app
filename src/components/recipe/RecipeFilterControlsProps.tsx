import { FC } from 'react';
import { Box, Button, ButtonGroup, Slider, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Search from './Search';
import Category from './Category';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import { RecipeFilterControlsProps } from '../../interfaces/interfaces';

const RecipeFilterControls: FC<RecipeFilterControlsProps> = ({
	search,
	setSearch,
	category,
	cookingTime,
	categories,
	handleCookingTimeChange,
	handleCategoryChange,
	currentRoute,
	setViewMode
}) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '40px', alignItems: 'center' }}>
			<Search search={search} setSearch={setSearch} />
			<Category category={category} categories={categories} handleCategoryChange={handleCategoryChange} />
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<AccessTimeIcon sx={{ mr: 3 }} />
				<Slider
					value={cookingTime}
					min={0}
					max={120}
					step={10}
					onChange={handleCookingTimeChange}
					valueLabelDisplay="auto"
					getAriaLabel={() => 'Cooking time slider'}
					sx={{ flexGrow: 1, width: 50, mr: 3 }}
				/>
				<Typography variant="body2">{cookingTime} mins</Typography>
			</Box>
			{currentRoute === "/savedrecipes" && setViewMode && (
				<ButtonGroup sx={{ marginLeft: '10px' }}>
					<Button variant="contained" onClick={() => setViewMode('all')} startIcon={<AllInclusiveIcon />}>All</Button>
					<Button variant="contained" onClick={() => setViewMode('saved')} startIcon={<BookmarkIcon />}>Saved</Button>
					<Button variant="contained" onClick={() => setViewMode('favorites')} startIcon={<FavoriteIcon />}>Favorites</Button>
				</ButtonGroup>
			)}
		</Box>
	);
};

export default RecipeFilterControls