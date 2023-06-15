import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/store/store';
import { selectUser } from '../../redux/store/selectors';

const PrivateRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	const { isLoggedIn } = useAppSelector(selectUser)

	if (!isLoggedIn) {
		return <Navigate to="/" />;

	}

	return children ? children : <Outlet />;
};

export default PrivateRoute