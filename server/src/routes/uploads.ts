import { Router } from "express";
import { type AuthedRequest, authMiddleware } from "../middleware/auth.js";
import { cloudinary } from "../utils/Cloudinary.js";

const router = Router();

router.get("/signature", authMiddleware, async (_req: AuthedRequest, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "chat-app" },
    process.env.CLOUDINARY_API_SECRET!
  );
  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
});

export default router;