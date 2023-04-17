const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtName: { type: String, required: true },
  thought: { type: String },
});

const Thought = model("thought", thoughtSchema);

const handleError = (err) => console.error(err);

// seed
Thought.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thought.insertMany(
      [
        { thoughtName: "Thought One", thought: "I have a thought.." },
        { thoughtName: "Thought Two", thought: "I have a thought.." },
        { thoughtName: "Thought Three", thought: "I have a thought.." },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

module.exports = Thought;
