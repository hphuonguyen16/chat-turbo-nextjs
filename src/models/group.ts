import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: { type: String, trim: true },
    avatar: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
        },
  },

  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);

