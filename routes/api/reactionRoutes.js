const router = require("express").Router();
const { getReactions } = require("../../controllers/reactionController");

// route = /api/reactions
router.route("/").get(getReactions);

module.exports = router;
