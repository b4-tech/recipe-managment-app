import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
	username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match')
});