import { Request, Response, NextFunction } from "express";
import { default as mongoose } from "mongoose";

import User from "../models/user.model.js";
import { UserExtended } from "../../../shared/dist/types.js";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      // res.redirect("/campgrounds");
      const { _id, username, email } = registeredUser;
      res.status(201).json({
        message: "User created successfully",
        user: { email, username, _id },
      });
    });
  } catch (e) {
    // res.redirect("register");
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = (req: Request, res: Response) => {
  const { _id, username, email } = req.user as UserExtended;
  res
    .status(200)
    .json({ message: "Login successful", user: { _id, username, email } });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logout(function (err) {
      if (err) return next(err);
      req.session.destroy(function (err) {
        if (err) return next(err);
        res.status(200).json({ message: "Successfully logged out!" });
      });
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
      console.error("Error in logoutUser: ", err.message);
    }
  }
};

const getUserTodos = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const user = await User.findById(id).populate({
      path: "todos",
    });

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    const { todos } = user;

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching user todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMe = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).send("Not authenticated");
  }
};

const verifySession = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
};

export default {
  register,
  login,
  logout,
  getUserTodos,
  getMe,
  verifySession,
};
