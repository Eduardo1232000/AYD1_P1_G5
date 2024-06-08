import { Grid, Link, Typography } from "@mui/material"
import { Link as LinkRouter } from "react-router-dom"
import { LoginCredentials } from "../components"

function LoginPage() {
	return (
		<Grid
			item
			xs={3}
			sx={{
				width: { lg: "40%", md: "50%", sm: "60%", xs: "70%" },
				bgcolor: "white",
				padding: 3,
				borderRadius: 2,
				boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
			}}>
			<Typography
				variant='h5'
				align='center'
				gutterBottom>
				Iniciar Sesion
			</Typography>
			<LoginCredentials/>
			<Grid
				container
				justifyContent='space-between'
				sx={{ mt: 2 }}>
				<Grid item>
					<Typography
						color='textSecondary'
						variant='body2'>
						No tienes cuenta?
					</Typography>
				</Grid>
				<Grid item>
					<Link
						color='inherit'
						component={LinkRouter}
						to='/auth/register'>
						Crear Cuenta
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default LoginPage
