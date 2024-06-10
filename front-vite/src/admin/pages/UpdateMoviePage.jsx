import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { errorMessage, successMessage } from "../../utils/messageStore"
import { updateMovie } from "../../api"
import { useLocation, useNavigate } from "react-router-dom"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

let formData = {
	titulo: "",
	sinopsis: "",
	precio_alquiler: "",
	director: "",
	year_estreno: "",
	duracion: "",
	genero: "",
	imagen: "",
}

function AddMoviePage() {
	const navigate = useNavigate()
	const location = useLocation()

	const formik = useFormik({
		initialValues: location.state ? location.state.movie : formData,
		validate: (values) => {
			const errors = {}
			if (!values.titulo) {
				errors.titulo = "Este campo es obligatorio."
			}
			if (!values.sinopsis) {
				errors.sinopsis = "Este campo es obligatorio."
			}
			if (!values.precio_alquiler) {
				errors.precio_alquiler = "Este campo es obligatorio."
			}
			if (!values.director) {
				errors.director = "Este campo es obligatorio."
			}
			if (!values.year_estreno) {
				errors.year_estreno = "Este campo es obligatorio."
			}
			if (!values.duracion) {
				errors.duracion = "Este campo es obligatorio."
			}
			if (!values.genero) {
				errors.genero = "Este campo es obligatorio."
			}
			if (!values.imagen) {
				errors.imagen = "Este campo es obligatorio."
			}
			return errors
		},
		onSubmit: async (values) => {
			try {
				const res = await updateMovie(values.titulo, values)
                console.log("Actualizando pelicula")
				console.log(res)
				successMessage("Pelicula actualizada correctamente.")
				navigate("/admin/contenido")
			} catch (error) {
				console.error(error)
				errorMessage("Error al agregar la pelicula.")
			}
		},
	})

	const goBack = () => {
		// Regresar a la pagina anterior usando el hook useNavigate
		navigate(-1)
	}

	return (
		<Grid
			container
			spacing={2}
			justifyContent='center'
			alignItems='center'
			padding={2}>
			<Button
				variant='outlined'
				color='primary'
				style={{ position: "absolute", top: 100, left: 40 }}
				onClick={goBack}
				startIcon={<ArrowBackIosIcon />}>
				Regresar
			</Button>
			<Grid
				// borde
				sx={{ border: "1px solid #ccc", borderRadius: "10px" }}
				margin={1}
				padding={2}
				item
				xs={12}
				md={6}
				lg={4}>
				<Typography
					variant='h4'
					align='center'
					color='text.primary'
					gutterBottom
					sx={{ fontWeight: "bold", my: 4 }}>
					Editar Pelicula
				</Typography>

				<form onSubmit={formik.handleSubmit}>
					<TextField
						label='Titulo'
						variant='outlined'
						type='text'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='titulo'
                        // solo lectura
                        disabled
						value={formik.values.titulo}
						onChange={formik.handleChange}
						error={!!formik.errors.titulo && formik.touched.titulo}
						helperText={
							formik.errors.titulo && formik.touched.titulo
								? formik.errors.titulo
								: ""
						}
					/>
					<TextField
						label='Sinopsis'
						variant='outlined'
						type='text'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='sinopsis'
						rows={5}
						multiline
						value={formik.values.sinopsis}
						onChange={formik.handleChange}
						error={!!formik.errors.sinopsis && formik.touched.sinopsis}
						helperText={
							formik.errors.sinopsis && formik.touched.sinopsis
								? formik.errors.sinopsis
								: ""
						}
					/>
					<TextField
						label='Precio'
						variant='outlined'
						type='number'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='precio_alquiler'
						value={formik.values.precio_alquiler}
						onChange={formik.handleChange}
						error={!!formik.errors.precio_alquiler && formik.touched.precio_alquiler}
						helperText={
							formik.errors.precio_alquiler && formik.touched.precio_alquiler
								? formik.errors.precio_alquiler
								: ""
						}
						InputProps={{
							startAdornment: <InputAdornment position='start'>Q</InputAdornment>,
						}}
					/>
					<TextField
						label='Director'
						variant='outlined'
						type='text'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='director'
						value={formik.values.director}
						onChange={formik.handleChange}
						error={!!formik.errors.director && formik.touched.director}
						helperText={
							formik.errors.director && formik.touched.director
								? formik.errors.director
								: ""
						}
					/>
					<TextField
						label='Año de Estreno'
						variant='outlined'
						type='number'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='year_estreno'
						value={formik.values.year_estreno}
						onChange={formik.handleChange}
						error={!!formik.errors.year_estreno && formik.touched.year_estreno}
						helperText={
							formik.errors.year_estreno && formik.touched.year_estreno
								? formik.errors.year_estreno
								: ""
						}
					/>
					<TextField
						label='Duracion'
						variant='outlined'
						type='number'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='duracion'
						value={formik.values.duracion}
						onChange={formik.handleChange}
						error={!!formik.errors.duracion && formik.touched.duracion}
						helperText={
							formik.errors.duracion && formik.touched.duracion
								? formik.errors.duracion
								: ""
						}
						InputProps={{
							endAdornment: <InputAdornment position='end'>min</InputAdornment>,
						}}
					/>
					<TextField
						label='Genero'
						variant='outlined'
						type='text'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='genero'
						value={formik.values.genero}
						onChange={formik.handleChange}
						error={!!formik.errors.genero && formik.touched.genero}
						helperText={
							formik.errors.genero && formik.touched.genero
								? formik.errors.genero
								: ""
						}
					/>
					<TextField
						label='Imagen'
						variant='outlined'
						type='text'
						fullWidth
						margin='normal'
						autoComplete='off'
						name='imagen'
						value={formik.values.imagen}
						onChange={formik.handleChange}
						error={!!formik.errors.imagen && formik.touched.imagen}
						helperText={
							formik.errors.imagen && formik.touched.imagen
								? formik.errors.imagen
								: ""
						}
					/>
					<Button
						variant='contained'
						color='secondary'
						fullWidth
						type='submit'>
						Guardar
					</Button>
				</form>
			</Grid>
		</Grid>
	)
}

export default AddMoviePage
