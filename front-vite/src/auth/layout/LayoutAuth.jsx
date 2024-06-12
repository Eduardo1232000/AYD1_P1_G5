import { Box, Divider, Grid, Typography } from "@mui/material"
import fondo from "../../assets/fondo.svg"
import { Outlet } from "react-router-dom"
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
function LayoutAuth() {
	return (
		<>
			<Grid
				container
				direction='row'
				alignItems='center'
				justifyContent='center'
				bgcolor='#5DADE2'>
				<Grid
					item
					margin={0}
					padding={0}
					xs={6}
					style={{
						backgroundImage: `url(${fondo})`,
						backgroundSize: "cover",
					}}
					
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Box
						height={"100vh"}
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography
							variant='h3'
							align='center'
							color='white'
							margin={1}
							gutterBottom>
							Bienvenido a Cinemania
						</Typography>
						<Divider
							variant='middle'
							style={{
								backgroundColor: "white",
								width: "90%",
								marginBottom: 10,
							}}
						/>
						<TheaterComedyIcon
							sx={{
								fontSize: 100,
								color: "white",
								padding: 2,
							}}
						/>
					</Box>
				</Grid>
				<Grid
					item
					xs={6}

					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Grid
						container
						direction='column'
						alignItems='center'
						justifyContent='center'>
						<Outlet />
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default LayoutAuth
