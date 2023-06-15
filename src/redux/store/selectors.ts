import { createSelector } from "reselect";
import { RootState } from "./types";

const getRecipeId = (_state: RootState, id: string | undefined) => id;

export const selectUser = (state: RootState) => state.user;
export const selectRecipes = (state: RootState) => state.recipes;

export const recipeSelector = createSelector(
	[selectRecipes, getRecipeId],
	(recipes, id) => recipes.find(recipe => recipe.id === id)
);