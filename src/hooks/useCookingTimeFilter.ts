import { Recipe } from '../interfaces/interfaces'

export const useCookingTimeFilter = (cookingTime: number) => {
	return (recipe: Recipe): boolean => cookingTime === 0 || recipe.cookingTime >= cookingTime;
};
