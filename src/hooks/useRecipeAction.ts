import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { saveRecipeForUser, unsaveRecipeForUser } from '../services/firebase/firebase';
import { selectUser } from '../redux/store/selectors';

export const useRecipeAction = (recipeId: string) => {
	const dispatch = useAppDispatch();
	const { userId } = useAppSelector(selectUser);

	const handleAction = useCallback(async (isActioned: boolean, actionType: boolean, addDispatch: any, removeDispatch: any) => {
		if (userId) {
			if (!isActioned) {
				await saveRecipeForUser(recipeId, userId, actionType);
				dispatch(addDispatch(recipeId));
			} else {
				await unsaveRecipeForUser(recipeId, userId, actionType);
				dispatch(removeDispatch(recipeId));
			}
		}
	}, [userId, recipeId, dispatch]);

	return handleAction;
};