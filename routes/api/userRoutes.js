const router = require("express").Router();
const { getUsers, getSingleUser } = require("../../controllers/userController");

// route = /api/users
router.route("/").get(getUsers);
router.route("/").get(getSingleUser);

module.exports = router;
