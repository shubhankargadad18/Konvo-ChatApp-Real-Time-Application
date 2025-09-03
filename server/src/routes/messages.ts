import { Router } from "express";
import { type AuthedRequest, authMiddleware } from "../middleware/auth.js";
import { Message } from "../models/Message.js";
import multer from "multer";
import { cloudinary } from "../utils/Cloudinary.js";
import { getObjectId } from "../utils/jwt.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
const router = Router();

// Get history with a user (cursor pagination by createdAt)
router.get("/with/:userId", authMiddleware, async (req: AuthedRequest, res) => {
  if (!req.params.userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }
  const peerId = getObjectId(req.params.userId);
  const meId = getObjectId(req.user!.id);
  const { before } = req.query; // ISO date string
  const filter: any = {
    $or: [
      { from: meId, to: peerId },
      { from: peerId, to: meId },
    ],
  };
  if (before) filter.createdAt = { $lt: new Date(String(before)) };

  const msgs = await Message.find(filter)
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  res.json(msgs.reverse());
});

// Send a message (text and/or image file)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req: AuthedRequest, res) => {
    const { to, content } = req.body as { to: string; content?: string };
    if (!to && !req.file)
      return res.status(400).json({ error: "Missing recipient or payload" });
    const meId = getObjectId(req.user!.id);
    const toId = getObjectId(to);

    let imageUrl: string | undefined;
    if (req.file) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "chat-app", resource_type: "image" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file!.buffer);
      });
      imageUrl = result.secure_url as string;
    }

    const msg = await Message.create({
      from: meId,
      to: toId,
      content,
      imageUrl,
    });

    // Emit over socket to both participants
    req.app
      .get("io")
      .to(meId.toString())
      .to(toId.toString())
      .emit("message:new", {
        id: msg.id,
        from: req.user!.id,
        to,
        content,
        imageUrl,
        createdAt: msg.createdAt,
      });

    res.status(201).json(msg);
  }
);

export default router;