import { Box, Button } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const LoggedOutButtons = () => (
	<Box>
		<Button color="inherit" component={RouterLink} to="/signup" variant="outlined">
			Sign Up
		</Button>
		<Button color="inherit" component={RouterLink} to="/signin">
			Sign In
		</Button>
	</Box>
);

export default LoggedOutButtons