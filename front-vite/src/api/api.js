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


