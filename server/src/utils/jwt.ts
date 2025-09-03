import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { env } from "../config/env.js";

export interface JWTPayload {
  id: string;
  email: string;
}

export function signToken(payload: JWTPayload, expiresIn = "7d") {
  if (!env.JWT_SECRET || typeof env.JWT_SECRET !== "string") {
    throw new Error("JWT_SECRET is not defined or is not a string");
  }
  // Explicitly type payload and options for jwt.sign
  return jwt.sign(payload as object, env.JWT_SECRET, {
    expiresIn,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload {
  if (!env.JWT_SECRET || typeof env.JWT_SECRET !== "string") {
    throw new Error("JWT_SECRET is not defined or is not a string");
  }
  return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
}

export function getObjectId(id: string) {
  return new Types.ObjectId(id);
}
