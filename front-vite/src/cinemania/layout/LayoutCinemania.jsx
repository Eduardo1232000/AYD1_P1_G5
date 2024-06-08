import { Box, Toolbar } from "@mui/material"
import NavBar from "../components/NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/auth"
import fondo2 from "../../assets/fondo2.svg"
import { useEffect } from "react"

function LayoutCineMania() {
	const username = useAuthStore((state) => state.username)
	const navigate = useNavigate()
	useEffect(() => {
		if (username === "" || username === null) {
			navigate("/auth/login")
		}
	}, [username, navigate])

	return (
		<Box
			sx={{
				display: "flex",
				backgroundImage: `url(${fondo2})`,
				backgroundSize: "cover",
				minHeight: "100vh",
			}}
			className='animate__animated animate__fadeIn animate__faster'>
			<NavBar />
			<Box
				component={"main"}
				sx={{
					flexGrow: 1,
					p: 3,
				}}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	)
}

export default LayoutCineMania
