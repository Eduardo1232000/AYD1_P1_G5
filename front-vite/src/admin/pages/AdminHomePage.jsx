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
		</Box>
	)
}

export default AdminHomePage
