import { createAccount } from '../../services/firebase/firebase';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { authErrorHandler } from '../utils/authErrorHandler';
import { useState } from 'react';
import { FormValues } from '../../interfaces/interfaces';
import { signUpSchema } from '../utils/valdationSchemas/signUpSchema';
import { signUpFields } from '../utils/formFields/signUpFields';
import { useAppDispatch } from '../../redux/store/store';

const SignUp = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch()

	const initialValues: FormValues = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const onSubmit = async (values: FormValues, { resetForm, setErrors }: any) => {
		try {
			const { username, email, password } = values;

			if (username !== undefined) {
				const user = await createAccount(username, email, password);
				if (user) {
					const userData = {
						email: user.email,
						username: user.username,
						userId: user.userId,
						favorites: user.favorites,
						saved: user.saved,
					};
					dispatch(setUser(userData));
					localStorage.setItem('user', JSON.stringify(userData));
					navigate('/');
				}
			}
		} catch (error) {
			const errorMessage = authErrorHandler(error);
			setErrors({ username: errorMessage, email: errorMessage, password: errorMessage, confirmPassword: errorMessage });
			setErrorMessage(errorMessage)
		}
		resetForm();
	};

	return <AuthForm initialValues={initialValues} validationSchema={signUpSchema} onSubmit={onSubmit} title="Sign Up" formFields={signUpFields} errorMessage={errorMessage} />;
};

export default SignUp;
