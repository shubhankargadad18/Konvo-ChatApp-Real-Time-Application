import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { connectDB } from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";
import uploadRoutes from "./routes/uploads.js";
import { createIO } from "./socket/io.js";

async function bootstrap() {
  await connectDB(env.MONGODB_URI);

  const app = express();
  const server = http.createServer(app);
  const io = createIO(server, env.CLIENT_ORIGIN);
  app.set("io", io);

  app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());

  app.get("/health", (_req, res) => res.send("ok"));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/uploads", uploadRoutes);

  server.listen(env.PORT, () =>
    console.log(`Server on http://localhost:${env.PORT}`)
  );
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});