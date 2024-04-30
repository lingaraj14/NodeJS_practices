const express = require("express");
const router = express.Router();

const {
  handleAllusers,
  getUserById,
  handleCreateUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

//Routes
/* router.get("/", handleAllusers);
router.get("/:id", getUserById);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.post("/", handleCreateUser); */

//We can write like this
router.route("/").get(handleAllusers).post(handleCreateUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
