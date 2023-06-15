import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { RecipeCardProps } from '../../interfaces/interfaces';
import { addFavorite, addSaved, removeFavorite, removeSaved } from '../../redux/slices/userSlice'
import { useAppSelector } from '../../redux/store/store';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { selectUser } from '../../redux/store/selectors';
import RecipeDetails from './RecipeDetails';
import ActionButton from './ActionButton';
import { useRecipeAction } from '../../hooks/useRecipeAction';

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	const { favorites, saved, isLoggedIn } = useAppSelector(selectUser);

	const isFavorite = favorites.includes(recipe.id);
	const isSaved = saved.includes(recipe.id);

	const handleAction = useRecipeAction(recipe.id);


	return (
		<Card sx={{ width: 320, height: 'auto', overflow: 'hidden' }}>
			<CardMedia component="img" height="140" image={recipe.image} alt={recipe.title} loading="lazy" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{recipe.title}
				</Typography>
				<RecipeDetails recipe={recipe} />
				{isLoggedIn && (
					<>
						<ActionButton
							color="primary"
							handleClick={() => handleAction(isSaved, false, addSaved, removeSaved)}
							isActive={isSaved}
							icon={<BookmarkIcon />}
						/>
						<ActionButton
							color="secondary"
							handleClick={() => handleAction(isFavorite, true, addFavorite, removeFavorite)}
							isActive={isFavorite}
							icon={<FavoriteIcon />}
						/>
					</>
				)}
			</CardContent>
		</Card>
	);
};


export default RecipeCard