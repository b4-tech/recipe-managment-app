export const authErrorHandler = (error: any): string => {
	const errorCode = error.code;
	let errorMessage = 'An error occurred. Please try again.';

	switch (errorCode) {
		case 'auth/user-not-found':
		case 'auth/wrong-password':
			errorMessage = 'Invalid email or password. Please try again.';
			break;
		case 'auth/email-already-in-use':
			errorMessage = 'Email is already in use. Please sign in or use another email address.';
			break;
	}

	return errorMessage;
};
