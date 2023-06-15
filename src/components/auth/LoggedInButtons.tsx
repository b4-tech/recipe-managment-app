import { Avatar, Box, IconButton } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { LoggedInButtonsProps } from "../../interfaces/interfaces";

const LoggedInButtons: React.FC<LoggedInButtonsProps> = ({ handleClick, username }) => (
	<Box>
		<IconButton color="inherit" component={RouterLink} to="/savedrecipes" aria-label="save">
			<BookmarkIcon />
		</IconButton>
		<IconButton color="inherit" component={RouterLink} to="/addrecipe" aria-label="add">
			<AddIcon />
		</IconButton>
		<IconButton onClick={handleClick} size="small">
			<Avatar>{username ? username.charAt(0) : 'U'}</Avatar>
		</IconButton>
	</Box>
);

export default LoggedInButtons