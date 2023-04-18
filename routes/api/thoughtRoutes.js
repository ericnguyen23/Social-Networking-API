const router = require("express").Router();
const { getUsers } = require("../../controllers/routeController");

// route = /api/users
router.route("/").get(getUsers);

module.exports = router;
