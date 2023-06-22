import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
        name: {
        type: "String",
        required: [true, "Please provide a name"],
        unique: true,
      },
      email: {
        type: "String",
        unique: true,
        required: true,
        lơwercase: true,
      },
      password: {
        type: "String",
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false,
      },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);