const { User, Thought } = require("../models");

// module.exports = {
//   // Get all users
//   getUsers(req, res) {
//     User.find({}, (err, result) => {
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         res.status(500).json({ message: "something went wrong" });
//       }
//     });
//   },
// };
module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .then((users) => res.json(users))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  // Get sincle user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
