/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "./store/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { api } from "./api/client";

export default function App() {
  const { token, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "chat">(
    token ? "chat" : "login"
  );

  useEffect(() => {
    async function fetchMe() {
      if (!token) return;
      try {
        const { data } = await api.get("/users/me");
        // set user in store if needed (kept simple here)
      } catch {
        logout();
        setMode("login");
      }
    }
    fetchMe();
  }, [logout, token]);

  if (mode === "login")
    return (
      <Login
        onSwitch={() => setMode("register")}
        onSuccess={() => setMode("chat")}
      />
    );
  if (mode === "register")
    return (
      <Register
        onSwitch={() => setMode("login")}
        onSuccess={() => setMode("chat")}
      />
    );
  return (
    <Chat
      onLogout={() => {
        logout();
        setMode("login");
      }}
    />
  );
}