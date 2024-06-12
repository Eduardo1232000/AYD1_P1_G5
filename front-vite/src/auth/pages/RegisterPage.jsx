import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as LinkRouter } from "react-router-dom"
import { useFormik } from "formik"
import { postRegister } from "../../api"
import { errorMessage, successMessage } from "../../utils/messageStore"

const formData = {
	username: "",
	lastname: "",
	email: "",
	gender: "",
	birthdate: "",
	password: "",
	passwordConfirm: "",
}

function RegisterPage() {
	const formik = useFormik({
		initialValues: formData,
		validate: (values) => {
			const errors = {};
			if (!values.username) {
				errors.username = "Este campo es obligatorio.";
			}
			if (!values.lastname) {
				errors.fullname = "Este campo es obligatorio.";
			}
			if (!values.email) {
				errors.email = "Este campo es obligatorio.";
			} else {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(values.email)) {
					errors.email = "Formato de correo electrónico inválido.";
				}
			}
			if (!values.gender) {
				errors.gender = "Este campo es obligatorio.";
			}
			if (values.gender !== "M" && values.gender !== "F") {
				errors.gender = "Los únicos valores permitidos son F o M.";
			}
			if (!values.password) {
				errors.password = "Este campo es obligatorio.";
			} else if (values.password.length < 8) {
				errors.password = "La contraseña debe tener al menos 8 caracteres.";
			} else {
				const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
				if (!passwordRegex.test(values.password)) {
					errors.password = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.";
				}
			}
			if (!values.passwordConfirm) {
				errors.passwordConfirm = "Este campo es obligatorio.";
			} else if (values.password !== values.passwordConfirm) {
				errors.passwordConfirm = "Las contraseñas no coinciden.";
			}
			return errors;
		},
		onSubmit: async ({ username, lastname, email, gender, birthdate, password }) => {
			try {
				await postRegister({
					username,
					lastname,
					email,
					gender,
					birthdate,
					password,
				});
				successMessage("Usuario registrado exitosamente.");
			} catch (error) {
				console.error(error);
				errorMessage("Error al registrar usuario.");
			} finally {
				handleReset();
			}
		},
	});


	const handleReset = () => {
		formik.resetForm()
	}

	return (
		<Grid
			item
			sx={{
				width: { lg: "45%", md: "70%", sm: "75%", xs: "80%" },
				bgcolor: "white",
				padding: 4,
				borderRadius: 2,
				boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
			}}>
			<Typography
				variant='h4'
				align='center'
				gutterBottom>
				Registro
			</Typography>

			<form onSubmit={formik.handleSubmit}>
				<TextField
					label='Nombre'
					variant='outlined'
					fullWidth
					size='small'
					type='text'
					margin='normal'
					autoComplete='off'
					name='username'
					value={formik.values.username}
					onChange={formik.handleChange}
					error={!!formik.errors.username && formik.touched.username}
					helperText={
						formik.errors.username && formik.touched.username
							? formik.errors.username
							: ""
					}
				/>
				<TextField
					label='Apellido'
					variant='outlined'
					type='text'
					size='small'
					fullWidth
					margin='normal'
					autoComplete='off'
					name='lastname'
					value={formik.values.lastname}
					onChange={formik.handleChange}
					error={!!formik.errors.lastname && formik.touched.lastname}
					helperText={
						formik.errors.lastname && formik.touched.lastname
							? formik.errors.lastname
							: ""
					}
				/>
				<TextField
					// email
					label='Correo Electronico'
					variant='outlined'
					type='email'
					fullWidth
					size='small'
					margin='normal'
					autoComplete='off'
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={!!formik.errors.email && formik.touched.email}
					helperText={
						formik.errors.email && formik.touched.email ? formik.errors.email : ""
					}
				/>
				<TextField
					label='Genero'
					variant='outlined'
					type='text'
					fullWidth
					size='small'
					margin='normal'
					autoComplete='off'
					placeholder='M o F'
					name='gender'
					value={formik.values.gender}
					onChange={formik.handleChange}
					error={!!formik.errors.gender && formik.touched.gender}
					helperText={
						formik.errors.gender && formik.touched.gender ? formik.errors.gender : ""
					}
				/>

				<TextField
					variant='outlined'
					type='date'
					fullWidth
					size='small'
					margin='normal'
					name='birthdate'
					value={formik.values.birthdate}
					onChange={formik.handleChange}
					error={!!formik.errors.birthdate && formik.touched.birthdate}
					helperText={
						formik.errors.birthdate && formik.touched.birthdate ? formik.errors.birthdate : ""
					}
				/>


				<TextField
					label='Contraseña'
					variant='outlined'
					type='password'
					fullWidth
					size='small'
					margin='normal'
					autoComplete='off'
					name='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					error={!!formik.errors.password && formik.touched.password}
					helperText={
						formik.errors.password && formik.touched.password
							? formik.errors.password
							: ""
					}
				/>

				<TextField
					label='Confirmar Contraseña'
					variant='outlined'
					type='password'
					fullWidth
					size='small'
					margin='normal'
					autoComplete='off'
					name='passwordConfirm'
					value={formik.values.passwordConfirm}
					onChange={formik.handleChange}
					error={!!formik.errors.passwordConfirm && formik.touched.passwordConfirm}
					helperText={
						formik.errors.passwordConfirm && formik.touched.passwordConfirm
							? formik.errors.passwordConfirm
							: ""
					}
				/>

				<Button
					variant='contained'
					color='primary'
					fullWidth
					type='submit'>
					Crear Cuenta
				</Button>

				<Grid
					container
					justifyContent='space-between'
					sx={{ mt: 2 }}>
					<Grid item>
						<Typography
							color='textSecondary'
							variant='body2'>
							Ya tienes cuenta?
						</Typography>
					</Grid>
					<Grid item>
						<Link
							color='inherit'
							component={LinkRouter}
							to='/auth/login'>
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</Grid>
	)
}

export default RegisterPage
