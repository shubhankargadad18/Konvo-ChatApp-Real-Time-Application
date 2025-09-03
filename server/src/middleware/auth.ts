import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import type { JWTPayload } from "../utils/jwt.js";

export interface AuthedRequest extends Request {
  user?: JWTPayload;
}

export function authMiddleware(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed token" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
