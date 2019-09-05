const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
  displayName: { type: String, required: false },
  imageUrl: { type: String, required: false }
});

module.exports = mongoose.model("User", UserSchema);
