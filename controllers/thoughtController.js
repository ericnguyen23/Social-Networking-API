const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "something went wrong" });
      }
    });
  },
  // Get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the post 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
