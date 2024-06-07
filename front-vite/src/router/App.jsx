import LayoutAuth from "../auth/layout/LayoutAuth"
import { RegisterPage, LoginPage } from "../auth/pages"
import LayoutCineMania from "../cinemania/layout/LayoutCinemania"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { HomePage } from "../cinemania/pages"
import AdminHomePage from "../admin/pages/AdminHomePage"
import LayoutAdmin from "../admin/layout/LayoutAdmin"

const Router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutCineMania />,
		children: [{ path: "home", element: <HomePage /> }],
	},
	{
		path: "/admin",
		element: <LayoutAdmin />,
		children: [{ path: "home", element: <AdminHomePage /> }],
	},
	{
		path: "/auth",
		element: <LayoutAuth />,
		children: [
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
			{ path: "/auth", element: <Navigate to='/login' /> },
		],
	},

	{ path: "*", element: <Navigate to='/auth/login' /> },
])

function App() {
	return <RouterProvider router={Router} />
}

export default App
