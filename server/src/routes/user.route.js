const express = require("express")
const { userController } = require("../controllers/user.controller.js")
const { authenticateUser, authorizeUser } = require("../middlewares/auth.middleware.js")
const { ADMIN } = require("../utils/constant.utils.js")

const router = express.Router()

router.route("/").get(authenticateUser, authorizeUser(ADMIN), userController.getAllUsers)
router.route("/:userId").delete(authenticateUser, authorizeUser(ADMIN), userController.deleteAUser)

module.exports = router