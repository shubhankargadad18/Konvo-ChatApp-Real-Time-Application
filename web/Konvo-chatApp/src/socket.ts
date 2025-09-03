import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

let socket: Socket | null = null;
export function getSocket(token: string | null) {
  if (!token) return null;
  if (!socket) {
    socket = io(API_URL, { auth: { token } });
  }
  return socket;
}