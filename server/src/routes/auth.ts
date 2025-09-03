import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email already in use" });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  const token = signToken({ id: user.id, email: user.email });
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = signToken({ id: user.id, email: user.email });
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

export default router;