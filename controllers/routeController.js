const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    Thought.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "something went wrong" });
      }
    });
  },
};
