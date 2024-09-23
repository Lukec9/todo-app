import express from "express";
const router = express.Router();
import users from "../controllers/user.controller.js";
import { isLoggedIn, isCurrentUser, validateUser } from "../middleware.js";

router.get("/me", isLoggedIn, users.getMe);
router.get("/verify-session", users.verifySession);
router.post("/register", validateUser, users.register);

router.post("/login", users.login);

router.post("/logout", isLoggedIn, users.logout);

router.get("/:id/todos", isLoggedIn, isCurrentUser, users.getUserTodos);

export default router;
