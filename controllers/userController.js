const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      // populate the thoughts object
      .populate({ path: "thoughts" })
      .populate({ path: "friends" })
      .then((users) => res.json(users))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  // Get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // populate the thoughts object
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json("Created user");
      })
      .catch((err) => res.status(500).json(err));
  },
  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }, { $set: req.body })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  // add Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      // attempting to populate but not working as expected
      .populate({ path: "friends" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No User found with this ID" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
