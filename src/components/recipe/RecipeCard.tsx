import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { RecipeCardProps } from '../../interfaces/interfaces';
import RecipeDetails from './RecipeDetails';


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {

	return (
		<Card sx={{ width: 320, height: 'auto', overflow: 'hidden' }}>
			<CardMedia component="img" height="140" image={recipe.image} alt={recipe.title} loading="lazy" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{recipe.title}
				</Typography>
				<RecipeDetails recipe={recipe} />
			</CardContent>
		</Card>
	);
};


export default RecipeCard