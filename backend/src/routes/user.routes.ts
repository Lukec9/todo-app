import express from "express";
const router = express.Router();
import passport from "passport";
import users from "../controllers/user.controller.js";
import { isLoggedIn, isCurrentUser } from "../middleware.js";

router.get("/me", isLoggedIn, users.getMe);
router.get("/verify-session", isLoggedIn, users.verifySession);
router.post("/register", users.register);

router.post("/login", passport.authenticate("local"), users.login);

router.post("/logout", isLoggedIn, users.logout);

router.get("/:id/todos", isLoggedIn, isCurrentUser, users.getUserTodos);

export default router;
