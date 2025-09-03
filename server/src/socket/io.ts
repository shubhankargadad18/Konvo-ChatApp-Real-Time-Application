import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import { verifyToken } from "../utils/jwt.js";

export function createIO(server: HTTPServer, clientOrigin: string) {
  const io = new Server(server, {
    cors: { origin: clientOrigin, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) return next(new Error("No token"));
    try {
      const user = verifyToken(token);
      // attach to socket
      // @ts-ignore
      socket.user = user;
      next();
    } catch (e) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const user = (socket as any).user as { id: string; email: string };
    socket.join(user.id); // personal room

    socket.on("typing", (data: { to: string; typing: boolean }) => {
      io.to(data.to).emit("typing", { from: user.id, typing: data.typing });
    });

    socket.on("disconnect", () => {
      // handle presence if needed
    });
  });

  return io;
}