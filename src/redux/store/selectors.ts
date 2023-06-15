import { RootState } from "./types";

export const selectUser = (state: RootState) => state.user;
export const selectRecipes = (state: RootState) => state.recipes;