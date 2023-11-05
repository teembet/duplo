import { object, string } from 'yup';

export const signInValidation = object({
	email: string()
		.email('Please enter a valid email address')
		.required('Please enter your email address'),

	password: string().required('Please enter your password'),
});

