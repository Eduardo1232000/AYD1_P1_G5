import { LogoutOutlined } from "@mui/icons-material"
import LocalMoviesIcon from "@mui/icons-material/LocalMovies"
import { AppBar, Box, Button, Divider, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

function AdminNavBar() {
	const navigate = useNavigate()

	return (
		<AppBar position='fixed'>
			<Toolbar
				// color de fondo de theme primary
				sx={{ backgroundColor: "#205980" }}>
				<LocalMoviesIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
				<Typography
					variant='h6'
					noWrap
					component={Link}
					to='/admin/home'
					sx={{
						mr: 2,
						padding: 2,
						display: { md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".1rem",
						color: "inherit",
						textDecoration: "none",
					}}>
					CINEMANIA
				</Typography>

				<Grid
					container
					justifyContent='space-between'
					alignItems='center'>
					<Box sx={{ display: { xs: "none", sm: "flex" } }}>
						
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/admin/contenido'>
							Contenido
						</Button>
						<Divider orientation='vertical' flexItem 
						sx={{ backgroundColor: "#fff", mx: 2 }}
						/>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/eliminar-usuarios'>
							Eliminacion Usuarios
						</Button>
					</Box>

					<IconButton
						color='error'
						onClick={() => {
							navigate("/auth/login")
						}}>
						<LogoutOutlined />
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default AdminNavBar
