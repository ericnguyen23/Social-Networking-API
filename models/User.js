const { Schema, model } = require("mongoose");

// set schema using mongoose
const userSchema = new Schema({
  name: { type: String, required: true },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
});

// set model to User var
const User = model("user", userSchema);

const handleError = (err) => console.error(err);

// seed
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { name: "Eric" },
        { name: "Jordan" },
        { name: "Jacob" },
        { name: "Jane" },
        { name: "Jessica" },
        { name: "Jeremy" },
        { name: "Jude" },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

module.exports = User;
