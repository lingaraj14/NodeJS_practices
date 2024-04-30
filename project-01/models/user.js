const mongoose = require("mongoose");

//Schema Creation
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gennder: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Model Creation
const User = mongoose.model("user", userSchema);

module.exports = User;
