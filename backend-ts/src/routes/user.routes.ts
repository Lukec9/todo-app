import express from "express";
const router = express.Router();
import passport from "passport";
import users from "../controllers/user.controller.js";
// import { isLoggedIn, isAuthorized } from "../middleware";

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

router.get("/:id/todos",
  // isLoggedIn, isAuthorized,
  users.getUserTodos);

export default router;
