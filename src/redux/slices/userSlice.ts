import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../interfaces/interfaces';

const initialState: UserState = {
	email: null,
	username: null,
	userId: null,
	isLoggedIn: false,
	favorites: [],
	saved: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ email: string | null, username: string | null, userId: string | null, favorites: string[], saved: string[] }>) => {
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.userId = action.payload.userId;
			state.favorites = action.payload.favorites;
			state.saved = action.payload.saved;
			state.isLoggedIn = true;
		},
		clearUser: (state) => {
			state.email = '';
			state.username = '';
			state.favorites = [];
			state.saved = [];
			state.isLoggedIn = false;
			state.userId = null
		},
		addFavorite: (state, action: PayloadAction<string>) => {
			state.favorites.push(action.payload);
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.favorites = state.favorites.filter(recipeId => recipeId !== action.payload);
		},
		addSaved: (state, action: PayloadAction<string>) => {
			state.saved.push(action.payload);
		},
		removeSaved: (state, action: PayloadAction<string>) => {
			state.saved = state.saved.filter(recipeId => recipeId !== action.payload);
		},
	},
});


export const { setUser, clearUser, addFavorite, removeFavorite, addSaved, removeSaved } = userSlice.actions;


export default userSlice.reducer;
