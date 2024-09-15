import { Request, Response, NextFunction } from "express";
import { default as mongoose } from "mongoose";

import User from "../models/user.model.js";
import { UserExtended } from "../../../shared/dist/types.js";
import passport from "passport";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = req.body;
    const foundUser = await User.findOne({ $or: [{ email }, { username }] });

    if (foundUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    

    const user = new User({ email, username });

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      const { _id, username, email } = registeredUser;

      return res.status(201).json({
        message: "User created successfully",
        user: { email, username, _id },
      });
    });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate(
    "local",
    (err: Error | null, user: UserExtended | false, info: unknown) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const message =
          typeof info === "object" && info !== null && "message" in info
            ? (info as { message: string }).message
            : "Authentication failed";
        return res.status(400).json({ error: message });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        const { _id, username, email } = req.user as UserExtended;
        return res.status(200).json({
          message: "Login successful",
          user: { _id, username, email },
        });
      });
    }
  )(req, res, next);
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
