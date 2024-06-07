import axios from "axios"

const baseURL = "https://localhost:8080"

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


export const postRegister = async ({ username, fullname, email, password, image }) => {
	const response = await axiosInstance.post("/register", {
		username,
		fullname,
		email,
		password,
		image,
	})
	return response
}


