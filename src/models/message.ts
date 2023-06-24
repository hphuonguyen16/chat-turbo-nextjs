import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipientGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    content: { type: String, trim: true },
    parentMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createAt: { type: Date, default: Date.now },    
  },

  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
