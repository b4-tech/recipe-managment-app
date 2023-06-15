import React from 'react';
import { Grid } from '@mui/material';
import RecipeCard from './RecipeCard';
import { Recipe, RecipeGridProps } from '../../interfaces/interfaces'

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, currentRoute }) => {
	return (
		<Grid container spacing={2} justifyContent='space-around'>
			{recipes.map((recipe: Recipe) => (
				<Grid width='auto' key={recipe.id} >
					<RecipeCard recipe={recipe} currentRoute={currentRoute} />
				</Grid>
			))}
		</Grid>
	);
};

export default RecipeGrid;
