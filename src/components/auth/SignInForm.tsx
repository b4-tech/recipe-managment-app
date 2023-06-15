import { signInAuthUserWithEmailAndPassword } from '../../services/firebase/firebase';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { authErrorHandler } from '../utils/authErrorHandler';
import { useState } from 'react';
import { FormValues } from '../../interfaces/interfaces';
import { signInSchema } from '../utils/valdationSchemas/signInSchema';
import { signInFields } from '../utils/formFields/signInFields';


import { useAppDispatch } from '../../redux/store/store';

const SignIn = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch()

	const initialValues: FormValues = {
		email: '',
		password: '',
	};

	const onSubmit = async (values: FormValues, { resetForm, setErrors }: any) => {
		try {
			const user = await signInAuthUserWithEmailAndPassword(values.email, values.password);
			if (user) {
				dispatch(setUser(user));
				localStorage.setItem('user', JSON.stringify(user));
				navigate('/');
			}
		} catch (error) {
			const errorMessage = authErrorHandler(error);
			setErrors({ email: errorMessage, password: errorMessage });
			setErrorMessage(errorMessage)
		}
		resetForm();
	};


	return (
		<AuthForm
			initialValues={initialValues}
			validationSchema={signInSchema}
			onSubmit={onSubmit}
			title="Sign In"
			formFields={signInFields}
			errorMessage={errorMessage}
		/>
	);
};

export default SignIn;

