import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  content?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });

export const Message = model<IMessage>("Message", messageSchema);