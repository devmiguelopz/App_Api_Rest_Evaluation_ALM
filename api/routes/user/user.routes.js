const express = require("express");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.get("/", userController.userList);
router.get("/:id", userController.userDetail);
router.post("/", userController.userAdd);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);

module.exports = router;
