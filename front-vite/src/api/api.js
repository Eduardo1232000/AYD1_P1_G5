import axios from "axios"

const baseURL = "http://localhost:8080"

const axiosInstance = axios.create({
	baseURL,
})

export const postLogin = async ({ email, password }) => {
	const response = await axiosInstance.post("/login", {
		email,
		password,
	})
	return response
}


export const postRegister = async ({ username, lastname,gender, email,birthdate, password }) => {
	const response = await axiosInstance.post("/register", {
		username,
		lastname,
		gender,
		email,
		birthdate,
		password,
	})
	return response
}

export const postAddMovie = async ({ titulo, sinopsis, precio, director, estreno, duracion, genero, imagen }) => {
	const response = await axiosInstance.post("/ingresarpelicula", {
		titulo,
		sinopsis,
		precio,
		director,
		estreno,
		duracion,
		genero,
		imagen,
	})
	return response
}

export const getMovies = async () => {
	const response = await axiosInstance.get("/peliculas")
	return response
}

export const deleteMovie = async (titulo) => {
	const response = await axiosInstance.delete(`/peliculas/${titulo}`)
	return response
}

export const updateMovie = async (titulo, data) => {
	const response = await axiosInstance.put(`/peliculas/${titulo}`, data)
	return response
}


/* hbmg981 endpoints para usuario */


// Función para obtener el perfil del usuario
export const getProfile = async (email) => {
	const response = await axiosInstance.post("/perfil", { correo: email })
	return response
}

// Función para actualizar el perfil del usuario
export const updateProfile = async (profile) => {
    const response = await axiosInstance.post("/actualizar-perfil", profile);
    return response;
}

// Función para obtener el historial de alquileres del usuario
export const getHistoricoAlquiler = async (correo) => {
    const response = await axiosInstance.post("/historico-alquiler", { correo });
    return response;
};


/** fin hbmg981 */