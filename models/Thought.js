const { Schema, model } = require("mongoose");

//reaction schema
const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
