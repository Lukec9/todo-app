import express from "express";
const router = express.Router();
import passport from "passport";
import users from "../controllers/user.controller.js";
import { isLoggedIn, isCurrentUser } from "../middleware.js";

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

router.get("/:id/todos", isLoggedIn, isCurrentUser, users.getUserTodos);

export default router;
