import { Box, Typography } from "@mui/material"

function AdminHomePage() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 2,
			}}>
			<Typography
				variant='h4'
				align='center'
				color='text.primary'
				gutterBottom
				sx={{ fontWeight: "bold", my: 4 }}>
				Modulo de administrador
			</Typography>
			<Typography
				variant='h6'
				align='center'
				color='text.secondary'
				sx={{ fontWeight: "bold" }}>
				Esta es la pagina de inicio del modulo de administrador donde podras gestionar el contenido de la aplicacion.
			</Typography>
		</Box>
	)
}

export default AdminHomePage
