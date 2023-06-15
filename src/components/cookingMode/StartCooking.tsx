import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { recipeSelector } from '../../redux/store/selectors';
import { RootState } from '../../redux/store/types'

import { Button, Card, CardContent, CardMedia, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import useIngredientsChecklist from '../../hooks/useIngredientsChecklist';

const StartCooking: React.FC = () => {
	const { id } = useParams<{ id?: string }>();
	const recipe = useSelector((state: RootState) => recipeSelector(state, id));
	const navigate = useNavigate();

	const { checked, handleToggle, handleReset } = useIngredientsChecklist(recipe?.ingredients || []);

	const handleBack = () => {
		navigate(-1);
	};

	if (!recipe) {
		return (
			<Button startIcon={<ArrowBackIcon />} onClick={handleBack}>Back</Button>
		);
	}

	return (
		<Card sx={{ width: 550, height: 'auto', overflow: 'hidden' }}>
			<Button startIcon={<ArrowBackIcon />} onClick={handleBack}>Back</Button>
			<Button startIcon={<ReplayIcon />} onClick={handleReset}>Reset</Button>

			<CardMedia component="img" height="140" image={recipe.image} alt={recipe.title} loading="lazy" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">{recipe.title}</Typography>
				<Typography variant="body2" color="text.secondary">{recipe.description}</Typography>
				<Typography variant="body2" color="text.secondary">Cooking Time: {recipe.cookingTime} mins</Typography>

				<Typography variant="h6">Instructions:</Typography>
				<Typography variant="body2" color="text.secondary">{recipe.instructions}</Typography>

				<Typography variant="h6">Ingredients:</Typography>
				<List>
					{recipe.ingredients.map((ingredient) => (
						<ListItem key={ingredient} onClick={() => handleToggle(ingredient)}>
							<Checkbox checked={checked[ingredient] || false} />
							<ListItemText primary={ingredient} />
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
};

export default StartCooking;
