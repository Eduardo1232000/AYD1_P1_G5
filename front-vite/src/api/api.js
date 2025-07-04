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

export const getUsers = async () => {
	const response = await axiosInstance.get("/usuarios")
	return response
}

export const deleteUser = async (correo) => {
	const response = await axiosInstance.delete(`/usuarios/${correo}`)
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

// Función para obtener las películas alquiladas por correo
export const getPeliculasAlquiladasPorCorreo = async (correo) => {
    const response = await axiosInstance.post("/peliculas-alquiladas", { correo });
    return response;
};

export const verificarFechaDevolucion = async (correo, titulo) => {
	const response = await axiosInstance.post("/verifica-fecha", { correo, titulo });
	return response;
};

export const calcularPenalizacion = async (correo, titulo) => {
	const response = await axiosInstance.post("/penalizacion", { correo, titulo });
	return response;
};

export const devolverPelicula = async (correo, titulo) => {
	const response = await axiosInstance.post("/devolver", { correo, titulo });
	return response;
};

/** fin hbmg981 */

/* Endpoits usuarios*/
export const getPeliculas = async () => {
	const response = await axiosInstance.get("/peliculas")
	return response
}

export const getPeliculas2 = async () => {
	const response = await axiosInstance.get("/verPeliculas")
	return response
}

export const alquilarPelicula = async (correo, titulo) => {
	const response = await axiosInstance.post("/alquilarpelicula", { correo, titulo });
	return response;
};

export const getComentariosActivos = async (titulo) => {
    try {
        const response = await axiosInstance.get(`/comentariosactivos/${titulo}`);
        return response;
    } catch (error) {
        throw new Error('Error al obtener comentarios activos:', error);
    }
};

export const deleteComentario = async (id_comentario) => {
    try {
        const response = await axiosInstance.post("/eliminarcomentario", { id_comentario });
        return response;
    } catch (error) {
        throw new Error('Error al eliminar comentario:', error);
    }
};

export const postComentario = async ({ correo, titulo, comentario }) => {
    try {
        const response = await axiosInstance.post("/ingresarcomentario", {
            correo,
            titulo,
            comentario
        });
        return response;
    } catch (error) {
        throw new Error('Error al ingresar comentario:', error);
    }
};

/* FIN Endpoits usuarios*/