import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Admin", adminSchema);