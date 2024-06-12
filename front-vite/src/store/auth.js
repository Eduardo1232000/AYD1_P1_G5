import { create } from "zustand"

export const useAuthStore = create((set) => ({
	username: null,
	setUser: (username) => set({ username }),
	logout: () => set({ username: null }),
}))
