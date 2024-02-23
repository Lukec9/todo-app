const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../controllers/userController");

router.post("/register", users.register);

router.post(
  "/login",
  passport.authenticate(
    "local"
    // {
    //   failureFlash: true,
    //   failureRedirect: "/login",
    // }
  ),
  users.login
);

router.get("/logout", users.logout);

router.get("/:id/todos", users.getUserTodos);

module.exports = router;
