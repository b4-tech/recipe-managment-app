import { FC } from 'react';
import { Box, SelectChangeEvent, Slider, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Search from './Search';
import Category from './Category';

interface RecipeFilterControlsProps {
	search: string;
	setSearch: (value: string) => void;
	category: string;
	setCategory: (value: string) => void;
	cookingTime: number;
	setCookingTime: (value: number) => void;
	categories: string[];
	handleCookingTimeChange: (_event: any, newValue: number | number[]) => void;
	handleCategoryChange: (event: SelectChangeEvent) => void;
}

export const RecipeFilterControls: FC<RecipeFilterControlsProps> = ({
	search,
	setSearch,
	category,
	setCategory,
	cookingTime,
	setCookingTime,
	categories,
	handleCookingTimeChange,
	handleCategoryChange,
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

		</Box>
	);
};
