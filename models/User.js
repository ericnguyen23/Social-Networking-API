const { Schema, model } = require("mongoose");

// set schema using mongoose
const userSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
});

// friend count virtual
userSchema.virtual('friendCount').get(function () {
  return this.frinds.length;
});

// set model to User var
const User = model("user", userSchema);

const handleError = (err) => console.error(err);

// seed
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { name: "Eric", email: "Eric@gmail.com" },
        { name: "Jordan", email: "Jordan@gmail.com" },
        { name: "Jacob", email: "Jacob@gmail.com" },
        { name: "Jane", email: "Jane@gmail.com" },
        { name: "Jessica", email: "Jessica@gmail.com" },
        { name: "Jeremy", email: "Jeremy@gmail.com" },
        { name: "Jude", email: "Jude@gmail.com" },
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
