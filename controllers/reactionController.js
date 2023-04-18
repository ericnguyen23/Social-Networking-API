const { Reaction } = require("../models");

module.exports = {
  // get all reactions
  getReactions(req, res) {
    Reaction.find()
      .then((reactions) => res.json(reactions))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
};
