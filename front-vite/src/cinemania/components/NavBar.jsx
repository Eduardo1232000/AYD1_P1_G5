import { LogoutOutlined } from "@mui/icons-material"
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

function NavBar() {
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
					to='/home'
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
					<Box sx={{ display: { xs: "none", sm: "block" } }}
						 gap={2}
					>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/home'>
							Inicio
						</Button>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/home'>
							Peliculas
						</Button>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/home'>
							Comentar Contenido
						</Button>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/alquilar-pelicula'>
							Alquilar pelicula
						</Button>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/devolver-pelicula'>
							Devolver pelicula
						</Button>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/historico-alquiler'>
							Historial Alquiler
						</Button>
						<Button
							sx={{ color: "#fff" }}
							component={Link}
							to='/profile-edit'>
							Editar Perfil
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

export default NavBar