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
import Swal from "sweetalert2"
import { errorMessage, successMessage } from "../../utils/messageStore"
import { deleteUser, getUsers } from "../../api"

function DeleteUserPage() {
	const [users, setUsers] = useState([
		// usuario
		{
			nombre: "Juan",
			apellido: "Perez",
			genero: "Masculino",
			correo: "sad@gmail.com",
			fecha_nacimiento: "2021-10-10",
			estado_usuario: "Activo",
		},
	])

	const handleDeleteUser = (user) => {
		Swal.fire({
			title: "¿Estás seguro de eliminar el usuario?",
			text: "No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, eliminar!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deleteUser(user.correo)
					successMessage(`Se ha eliminado el usuario: ${user.correo} correctamente`)
					handleLoadUsers()
				} catch (error) {
					console.error(error)
					errorMessage("Ha ocurrido un error al eliminar el usuario")
				}
			}
		})
	}

	const handleLoadUsers = async () => {
		try {
			const { data } = await getUsers()
			setUsers(data.data)
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		handleLoadUsers()
	}, [])

	return (
		<Grid
			container
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
					Eliminacion de Usuarios
				</Typography>
			</Grid>
			<Grid item>
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
								<TableCell>Nombre</TableCell>
								<TableCell align='center'>Apellido</TableCell>
								<TableCell align='center'>Genero</TableCell>
								<TableCell align='center'>Correo</TableCell>
								<TableCell align='center'>Fecha de nacimiento</TableCell>
								<TableCell align='center'>Estado del usuario</TableCell>
								<TableCell align='center'>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((row) => (
								<TableRow
									key={row.correo}
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
										{row.nombre}
									</TableCell>
									<TableCell align='center'>{row.apellido}</TableCell>
									<TableCell align='center'>{row.genero}</TableCell>
									<TableCell align='center'>{row.correo}</TableCell>
									<TableCell align='center'>{row.fecha_nacimiento}</TableCell>
									<TableCell align='center'>{row.estado_usuario}</TableCell>
									<TableCell align='center'>
										<Button
											variant='contained'
											size='small'
											color='error'
											onClick={() => handleDeleteUser(row)}>
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

export default DeleteUserPage
