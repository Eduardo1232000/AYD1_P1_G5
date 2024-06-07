import { Box, Button, TextField } from "@mui/material"
// import { errorMessage, successMessage } from "../../utils/messageStore"
// import { postLogin } from "../../api"
import { useFormik } from "formik"
import { useAuthStore } from "../../store/auth"
import { useNavigate } from "react-router-dom"

const formData = {
	username: "",
	password: "",
}

function LoginCredentials() {
	const navigate = useNavigate()
	// Setear username en el store
	const setUser = useAuthStore((state) => state.setUser)

	const formik = useFormik({
		initialValues: formData,
		validate: (values) => {
			const errors = {}
			if (!values.username) {
				errors.username = "Este campo es obligatorio."
			}
			if (!values.password) {
				errors.password = "Este campo es obligatorio."
			}
			return errors
		},
		onSubmit: async (values) => {
			console.log(values)
			setUser(values.username)
			if(values.username === "admin" && values.password === "admin"){
				navigate("/admin/home")
				return
			}
			navigate("/home")
			
			// try {
			// 	const res = await postLogin(values)
			// 	console.log(res)
			// 	if (res.status === 200) {
			// 		successMessage("Inicio de sesion exitoso.")
			// 		setUser(values.username)
			// 		navigate("/home")
			// 		return
			// 	} else {
			// 		formik.setErrors({
			// 			username: "Usuario o contraseña incorrectos.",
			// 			password: "Email o contraseña incorrectos.",
			// 		})
			// 	}
			// } catch (error) {
			// 	console.error(error)
			// 	errorMessage("Error al iniciar sesion.")
			// }
		},
	})
	return (
		<form onSubmit={formik.handleSubmit}>
			<TextField
				label='Usuario'
				variant='outlined'
				type='text'
				fullWidth
				margin='normal'
				autoComplete='off'
				name='username'
				value={formik.values.username}
				onChange={formik.handleChange}
				error={!!formik.errors.username && formik.touched.username}
				helperText={
					formik.errors.username && formik.touched.username ? formik.errors.username : ""
				}
			/>
			<TextField
				label='Contraseña'
				variant='outlined'
				type='password'
				fullWidth
				margin='normal'
				autoComplete='off'
				name='password'
				value={formik.values.password}
				onChange={formik.handleChange}
				error={!!formik.errors.password && formik.touched.password}
				helperText={
					formik.errors.password && formik.touched.password ? formik.errors.password : ""
				}
			/>

			<Box sx={{ mt: 2 }}>
				<Button
					variant='contained'
					color='secondary'
					fullWidth
					type='submit'>
					Iniciar Sesion
				</Button>
			</Box>
		</form>
	)
}

export default LoginCredentials
