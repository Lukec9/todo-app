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
    console.error(e); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" }); // Send a meaningful error response
  }
};

const login = (req: Request, res: Response) => {
  const { _id, username, email } = req.user as UserExtended;
  res
    .status(200)
    .json({ message: "Login successful", user: { _id, username, email } });
};

const logout = (req: Request, res: Response) => {
  req.logout(function (_) {
    res.status(200).json("Logged out successfully");
  });
};

const getUserTodos = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const user = await User.findById(id).select("todos").populate("todos");

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

export default {
  register,
  login,
  logout,
  getUserTodos,
};
