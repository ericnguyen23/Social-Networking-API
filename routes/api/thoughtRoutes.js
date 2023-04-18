const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
} = require("../../controllers/thoughtController");

// route = /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// route = /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought);

module.exports = router;
