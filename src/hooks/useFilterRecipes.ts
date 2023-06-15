import { Recipe } from '../interfaces/interfaces'
import { useMemo } from 'react';

type FilterFn = (recipe: Recipe) => boolean;

export const useFilterRecipes = (
	recipes: Recipe[],
	search: string,
	category: string,
	additionalFilters: FilterFn[]
): Recipe[] => {
	return useMemo(() => {
		return recipes.filter((recipe: Recipe) => {
			const searchCondition = recipe.title.toLowerCase().includes(search.toLowerCase()) ||
				recipe.ingredients.join(' ').toLowerCase().includes(search.toLowerCase());

			const categoryCondition = !category || recipe.category === category;

			const additionalConditions = additionalFilters.every(fn => fn(recipe));

			return searchCondition && categoryCondition && additionalConditions;
		});
	}, [recipes, search, category, additionalFilters]);
};
