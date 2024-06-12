import {
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteMovie, getMovies } from "../../api"
import Swal from "sweetalert2"
import { errorMessage, successMessage } from "../../utils/messageStore"

function MoviesContentPage() {
	const navigate = useNavigate()
	const [movies, setMovies] = useState([])

	const goToAddMovie = () => {
		navigate("/admin/pelicula")
	}

	const handleEditMovie = (movie) => {
        console.log(movie)
		navigate("/admin/pelicula-actualizar", { state: { movie } })
	}

	const handleDeleteMovie = (movie) => {
		Swal.fire({
			title: "¿Estás seguro de eliminar la película?",
			text: "No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, eliminar!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deleteMovie(movie.titulo)
					successMessage(`Se ha eliminado la película: ${movie.titulo} correctamente`)
					loadMovies()
				} catch (error) {
					console.error(error)
					errorMessage("Ha ocurrido un error al eliminar la película")
				}
			}
		})
	}

	const loadMovies = async () => {
		try {
			const { data } = await getMovies()
			setMovies(data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		loadMovies()
	}, [])
	return (
		<Grid
			container
			spacing={2}
			justifyContent='center'
			alignItems='center'>
			<Grid
				item
				xs={12}>
				<Typography
					variant='h4'
					align='center'
					color='text.primary'
					sx={{ fontWeight: "bold", my: 4 }}>
					Contenido de peliculas
				</Typography>
			</Grid>
			<Grid
				item
				xs={10}>
				<Button
					variant='contained'
					color='primary'
					onClick={goToAddMovie}>
					Agregar pelicula
				</Button>
				<TableContainer
					component={Paper}
					sx={{ marginTop: 2 }}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label='simple table'>
						<TableHead
							sx={{
								backgroundColor: "primary.dark",
							}}>
							<TableRow>
								<TableCell>Titulo</TableCell>
								<TableCell align='center'>Sinopsis</TableCell>
								<TableCell align='center'>Precio</TableCell>
								<TableCell align='center'>Director</TableCell>
								<TableCell align='center'>Año de estreno</TableCell>
								<TableCell align='center'>Duracion(min)</TableCell>
								<TableCell align='center'>Genero</TableCell>
								<TableCell align='center'>Imagen</TableCell>
								<TableCell align='center'>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{movies.map((row) => (
								<TableRow
									key={row.titulo}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },

										"&:hover": { backgroundColor: "#DBDBDB" },
										// Cambiar el tiempo de transición
										transition: "0.3s",
										// Colocar borde abajo de cada fila
									}}>
									<TableCell
										component='th'
										scope='row'>
										{row.titulo}
									</TableCell>
									<TableCell align='center'>{row.sinopsis}</TableCell>
									<TableCell align='center'>{row.precio_alquiler}</TableCell>
									<TableCell align='center'>{row.director}</TableCell>
									<TableCell align='center'>{row.year_estreno}</TableCell>
									<TableCell align='center'>{row.duracion}</TableCell>
									<TableCell align='center'>{row.genero}</TableCell>
									<TableCell align='center'>
										<img
											src={row.imagen}
											alt={row.titulo}
											style={{
												width: 100,
												height: 100,
												// cover
												objectFit: "cover",
											}}
										/>
									</TableCell>
									<TableCell align='center'>
										<Button
											variant='contained'
											size='small'
											color='primary'
											sx={{ m: 1 }}
											onClick={() => handleEditMovie(row)}>
											Editar
										</Button>
										<Button
											variant='contained'
											size='small'
											color='error'
											onClick={() => handleDeleteMovie(row)}>
											Eliminar
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	)
}

export default MoviesContentPage
