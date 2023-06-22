import mongoose from "mongoose";

const { Schema } = mongoose;

const messageRecipientSchema = new Schema(
  {
        recipient_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        recipient_group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserGroup",
        },
        message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        isRead: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export default mongoose.models.MessageRecipient || mongoose.model("MessageRecipient", messageRecipientSchema);

