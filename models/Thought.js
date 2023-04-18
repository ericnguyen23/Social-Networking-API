const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: { type: Array },
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
