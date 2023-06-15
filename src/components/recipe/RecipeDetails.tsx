import { Box, Typography } from "@mui/material";
import { RecipeDetailsProps } from "../../interfaces/interfaces";

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => (
	<Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', height: 270 }}>
		<Typography variant="body2" color="text.secondary">
			{recipe.description}
			<br />
			<b>Ingredients:</b> {recipe.ingredients.join(', ')}
			<br />
			<b>Instructions:</b> {recipe.instructions}
		</Typography>
	</Box>
);

export default RecipeDetails