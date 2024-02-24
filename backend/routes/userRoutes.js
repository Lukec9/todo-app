const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../controllers/userController");
const { isLoggedIn, isAuthorized } = require("../middleware");

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

router.get("/:id/todos", isLoggedIn, isAuthorized, users.getUserTodos);

module.exports = router;
