const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: "reactions" })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
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
              message: "Thought created, but found no user with that id",
            })
          : res.json("Created thought")
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
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Store reaction /api/thoughts/:thoughtId/reactions
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought frind with id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this i" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
