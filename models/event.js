const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: String, default: Date.now },
  ownerId: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
});


module.exports = mongoose.model("Event", EventSchema);
