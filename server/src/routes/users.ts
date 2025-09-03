import { Router } from "express";
import { authMiddleware, type AuthedRequest } from "../middleware/auth.js";
import { User } from "../models/User.js";

const router = Router();

router.get("/me", authMiddleware, async (req: AuthedRequest, res) => {
  const me = await User.findById(req.user!.id).select("id name email");
  res.json(me);
});

router.get("/", authMiddleware, async (req: AuthedRequest, res) => {
  const users = await User.find({ _id: { $ne: req.user!.id } }).select(
    "id name email"
  );
  res.json(users);
});

export default router;