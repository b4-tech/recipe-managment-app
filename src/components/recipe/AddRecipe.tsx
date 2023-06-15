import React, { useState } from 'react';
import { useFormik } from 'formik';
import { v1 as uuidv1 } from 'uuid';
import { TextField, Button, Box, Rating, Typography, Chip, InputAdornment, Grid, FormControl, FormLabel } from '@mui/material';
import { styled } from '@mui/system';
import { addRecipeToDB } from '../../services/firebase/firebase';
import { Recipe } from '../../interfaces/interfaces';
import { addRecipeSchema } from '../utils/valdationSchemas/addRecipeSchema';
import { useAppSelector } from '../../redux/store/store';
import { selectUser } from '../../redux/store/selectors';

const StyledBox = styled(Box)({
	boxShadow: '0px 3px 6px #00000029',
	padding: '20px',
	maxWidth: '480px',
	margin: 'auto',
});

const StyledTextField = styled(TextField)({
	marginBottom: '20px',
});

const StyledButton = styled(Button)({
	marginTop: '20px',
});

const AddRecipe: React.FC = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [isRatingClicked, setIsRatingClicked] = useState(false);
	const { username } = useAppSelector(selectUser)

	const initialValues: Recipe = {
		id: uuidv1(),
		title: '',
		description: '',
		ingredients: [],
		instructions: '',
		image: '',
		category: '',
		cookingTime: 1,
		rating: 0,
		author: username || ''
	}

	const onSubmit = async (values: Recipe, { resetForm }: { resetForm: () => void }) => {
		try {
			const recipeId = await addRecipeToDB(values);
			console.log('Recipe added successfully with ID:', recipeId);
			resetForm();
		} catch (error) {
			setErrorMessage(`Error adding recipe: ${error}`);
		}
	};


	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: addRecipeSchema,
		onSubmit: onSubmit
	});

	const handleRemoveIngredient = (index: number) => {
		const newIngredients = [...formik.values.ingredients];
		newIngredients.splice(index, 1);
		formik.setFieldValue('ingredients', newIngredients);
	};

	return (
		<StyledBox>
			<Typography variant="h4" gutterBottom>
				Add Recipe
			</Typography>

			{errorMessage && (
				<Typography sx={{ marginBottom: '20px' }} color="error">
					{errorMessage}
				</Typography>)
			}

			<form onSubmit={formik.handleSubmit}>
				<StyledTextField
					id="title"
					label={
						formik.touched.title && formik.errors.title
							? formik.errors.title
							: 'Title'
					}
					value={formik.values.title}
					onChange={formik.handleChange}
					error={formik.touched.title && Boolean(formik.errors.title)}
					fullWidth
					variant="outlined"
					size="small"
				/>
				{formik.touched.title && formik.errors.title ? (
					<Typography color="error">{formik.errors.title}</Typography>
				) : null}

				<StyledTextField
					id="description"
					label="Description"
					value={formik.values.description}
					onChange={formik.handleChange}
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
					fullWidth
					variant="outlined"
					size="small"
					multiline
					rows={4}
				/>

				<StyledTextField
					id="ingredients"
					label="Add ingredients"
					value={ingredients}
					onChange={(event) => setIngredients(event.target.value)}
					fullWidth
					variant="outlined"
					size="small"
					onKeyDown={(event) => {
						const target = event.target as HTMLInputElement;
						if (event.key === 'Enter' && target.value.trim() !== '') {
							event.preventDefault();
							formik.setFieldValue('ingredients', [...formik.values.ingredients, target.value.trim()]);
							setIngredients('');
						}

					}}
				/>

				<Box display="flex" flexWrap="wrap" marginBottom='15px'>
					{formik.values.ingredients.map((ingredient, index) => (
						<Chip
							key={index}
							label={ingredient}
							onDelete={() => handleRemoveIngredient(index)}
							clickable
							color="primary"
							variant="outlined"
							style={{ margin: '5px' }}
						/>
					))}
				</Box>

				<StyledTextField
					id="instructions"
					label="Instructions"
					value={formik.values.instructions}
					onChange={formik.handleChange}
					error={formik.touched.instructions && Boolean(formik.errors.instructions)}
					helperText={formik.touched.instructions && formik.errors.instructions}
					fullWidth
					variant="outlined"
					size="small"
					multiline
					rows={4}
				/>

				<StyledTextField
					id="image"
					label="Image URL"
					value={formik.values.image}
					onChange={formik.handleChange}
					error={formik.touched.image && Boolean(formik.errors.image)}
					helperText={formik.touched.image && formik.errors.image}
					fullWidth
					variant="outlined"
					size="small"
				/>

				<StyledTextField
					id="category"
					label="Category"
					value={formik.values.category}
					onChange={formik.handleChange}
					error={formik.touched.category && Boolean(formik.errors.category)}
					helperText={formik.touched.category && formik.errors.category}
					fullWidth
					variant="outlined"
					size="small"
				/>

				<Grid container spacing={3}>
					<Grid item xs={6}>


						<FormControl variant="outlined" size="small" fullWidth sx={{ mt: 1, mb: 2 }}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									height: '40px',
									borderColor: isRatingClicked ? 'primary.main' : 'divider',
									borderWidth: '1px',
									borderStyle: 'solid',
									borderRadius: '5px',
									position: 'relative',
									transition: 'border-color 0.3s',
								}}
							>
								{isRatingClicked && (
									<FormLabel
										htmlFor="rating"
										component="legend"
										sx={{
											position: 'absolute',
											top: '-0.1em',
											left: '1em',
											backgroundColor: 'background.paper',
											paddingLeft: '0.25em',
											paddingRight: '0.25em',
											fontSize: '0.75em',
											transform: 'translateY(-50%)',
											color: 'primary.main',
											transition: 'all 0.3s'

										}}
									>
										Rating
									</FormLabel>
								)}
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										width: '100%',
										pl: 1,
										pr: 1
									}}
								>
									<Rating
										id="rating"
										name="rating"
										value={Number(formik.values.rating)}
										onChange={(_e, newValue) => {
											formik.setFieldValue('rating', newValue);
											setIsRatingClicked(true);
										}}
									/>
									{formik.touched.rating && formik.errors.rating && (
										<Typography color="error">{formik.errors.rating}</Typography>
									)}
								</Box>
							</Box>
						</FormControl>
					</Grid>

					<Grid item xs={6}>
						<TextField
							id="cookingTime"
							label="Cooking Time"
							type="number"
							InputProps={{
								endAdornment: <InputAdornment position="end">Min</InputAdornment>,
								inputProps: {
									min: 1,
									style: {
										MozAppearance: 'textfield'
									}
								}
							}}
							value={formik.values.cookingTime}
							onChange={formik.handleChange}
							error={formik.touched.cookingTime && Boolean(formik.errors.cookingTime)}
							helperText={formik.touched.cookingTime && formik.errors.cookingTime}
							fullWidth
							variant="outlined"
							size="small"
						/>
					</Grid>
				</Grid>

				<StyledButton
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
					disabled={!formik.isValid || formik.isSubmitting}
				>
					Submit
				</StyledButton>
			</form>
		</StyledBox>
	);
};

export default AddRecipe;
