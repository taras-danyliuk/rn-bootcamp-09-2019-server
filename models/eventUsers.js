const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventUsersSchema = new Schema({
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("EventUsers", EventUsersSchema);
