const mongoose = require("mongoose");

// define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// set model to User var
const User = mongoose.model("User", userSchema);

// seed data if empty
User.find({}).exec((err, collection) => {
  if (collection === 0) {
    User.insertMany(
      [
        { name: "Eric" },
        { name: "Jane" },
        { name: "Jacob" },
        { name: "Steve" },
        { name: "Lucy" },
        { name: "Beth" },
        { name: "Jordan" },
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
