import { useEffect, useState } from "react";

const useIngredientsChecklist = (ingredients: string[]) => {
	const [checked, setChecked] = useState<Record<string, boolean>>({});

	useEffect(() => {
		setChecked(ingredients.reduce((acc, ingredient) => ({ ...acc, [ingredient]: false }), {}));
	}, [ingredients]);

	const handleToggle = (ingredient: string) => {
		setChecked(prevState => ({ ...prevState, [ingredient]: !prevState[ingredient] }));
	};

	const handleReset = () => {
		setChecked(ingredients.reduce((acc, ingredient) => ({ ...acc, [ingredient]: false }), {}));
	};

	return { checked, handleToggle, handleReset };
};

export default useIngredientsChecklist