import mongoose from "mongoose";

const { Schema } = mongoose;

const userGroupSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const UserGroup = mongoose.model("UserGroup", userGroupSchema);

module.exports = UserGroup;
