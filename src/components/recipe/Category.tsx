import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CategoryProps } from '../../interfaces/interfaces';

const Category: React.FC<CategoryProps> = ({ category, categories, handleCategoryChange }) => {
	return (
		<FormControl variant="filled" sx={{ width: 300 }}>
			<InputLabel>Category</InputLabel>
			<Select value={category} onChange={handleCategoryChange}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{categories.map((category, index) => (
					<MenuItem key={index} value={category}>{category}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default Category;
