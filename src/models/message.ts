import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, trim: true },
    parentMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createAt: { type: Date, default: Date.now },    
    isReminder: { type: Boolean, default: false },
    reminder: { type: mongoose.Schema.Types.ObjectId, ref: "Reminder" },
  },

  { timestamps: true }
);

module.exports =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
