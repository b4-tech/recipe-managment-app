import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { ReactElement } from 'react';
import { AuthFormProps } from '../../interfaces/interfaces';


const AuthForm = ({ title, initialValues, formFields, onSubmit, validationSchema, errorMessage }: AuthFormProps): ReactElement => {

	return (
		<Box
			sx={{
				boxShadow: '0px 3px 6px #00000029',
				padding: 3,
				maxWidth: '480px',
				margin: 'auto',
			}}
		>
			<Typography variant="h4" sx={{ marginBottom: '20px' }}>{title}</Typography>
			{errorMessage && (
				<Typography sx={{ marginBottom: '20px' }} color="error">
					{errorMessage}
				</Typography>
			)}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ errors, touched, isValid }) => (
					<Form>
						<Grid container spacing={3}>
							{formFields.map((field, index) => (
								<Grid item xs={12} key={index}>
									<Field
										id={field.name}
										name={field.name}
										type={field.type}
										as={TextField}
										label={
											touched[field.name] && errors[field.name]
												? errors[field.name]
												: field.label
										}
										error={touched[field.name] && Boolean(errors[field.name])}
										autoComplete={field.autoComplete}
										fullWidth
									/>
								</Grid>
							))}
							<Grid item xs={12} key='submit'>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									fullWidth
									disabled={!isValid}
								>
									{title}
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default AuthForm;