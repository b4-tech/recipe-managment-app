import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../services/firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Recipe } from '../../interfaces/interfaces';

export const fetchRecipes = createAsyncThunk(
	'recipes/fetchRecipes',
	async () => {
		const recipesCollectionRef = collection(db, 'recipes');
		const snapshot = await getDocs(recipesCollectionRef);
		const recipes: Recipe[] = [];
		snapshot.forEach((doc) => recipes.push(doc.data() as Recipe));
		return recipes;
	}
);

export const recipesSlice = createSlice({
	name: 'recipes',
	initialState: [] as Recipe[],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRecipes.fulfilled, (_state, action: PayloadAction<Recipe[]>) => {
			return action.payload;
		});
	},
});
