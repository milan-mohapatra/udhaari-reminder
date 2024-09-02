const { User } = require("../models/user.model.js");
const { CustomError } = require("../utils/errors.util.js");

const userController = {};

/*
GET /api/v1/admin/users
Auth: admin
Access: NA
*/
userController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select({password: false});

    res.json(users);
  } catch (err) {
    next(new CustomError(err.message));
  }
};

/*
DELETE /api/v1/admin/users/:userId
Auth: admin
Access: NA
*/
userController.deleteAUser = async (req, res, next) => {
    const userId = req.params.userId

    try {
        const user = await User.findByIdAndDelete(userId)

        res.json({message: "user deleted successfully"})
      } catch (err) {
        next(new CustomError(err.message));
      }
};

module.exports = { userController };
