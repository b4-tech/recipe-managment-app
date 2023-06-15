import { useState } from 'react';
import { clearUser } from '../../redux/slices/userSlice';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { selectUser } from '../../redux/store/selectors';
import LoggedOutButtons from '../auth/LoggedOutButtons'
import LoggedInButtons from '../auth/LoggedInButtons'

// eslint-disable-next-line no-empty-pattern
const StyledToolbar = styled(Toolbar)(({ }) => ({
	display: 'flex',
	justifyContent: 'space-between',
}));

function NavBar() {
	const dispatch = useAppDispatch();
	const { username, isLoggedIn } = useAppSelector(selectUser);

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget as HTMLButtonElement);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(clearUser());
		localStorage.removeItem('user');
		handleClose();
	};

	return (
		<AppBar position="sticky" style={{ marginBottom: '40px' }}>
			<StyledToolbar>
				<RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Typography variant="h6" color="inherit">
						Recipes
					</Typography>
				</RouterLink>
				<div>
					{!isLoggedIn ? (
						<LoggedOutButtons />
					) : (
						<div>

							<LoggedInButtons handleClick={handleClick} username={username} />
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								sx={{
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								}}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
						</div>
					)}
				</div>
			</StyledToolbar>
		</AppBar>
	);
}

export default NavBar;
