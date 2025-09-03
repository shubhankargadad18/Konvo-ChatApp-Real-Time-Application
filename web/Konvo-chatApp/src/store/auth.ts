import { create } from "zustand";
import { api } from "../api/client";

type User = { id: string; name: string; email: string };

type AuthState = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    set({ user: data.user, token: data.token });
  },
  async register(name, email, password) {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    set({ user: data.user, token: data.token });
  },
  logout() {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));