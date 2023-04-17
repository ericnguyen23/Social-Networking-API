const mongoose = require("mongoose");

// connect locally
mongoose.connect("mongodb://127.0.0.1:27017/usersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export
module.exports = mongoose.connection;
