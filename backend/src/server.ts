import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import LocalStrategy from "passport-local";
import MongoStore from "connect-mongo";
import session, { SessionOptions } from "express-session";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import path from "path";

import connectToDB from "./utils/connectToDB.js";

import User from "./models/user.model.js";

import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import csrfRoutes from "./routes/csrf.routes.js";

import { createCsrfToken, verifyCsrfTokenOnRoutes } from "./middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.LOC_CLIENT_URL
        : process.env.PROD_CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  ttl: 7 * 24 * 60 * 60,
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig: SessionOptions = {
  store,
  name: "session",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    // sameSite: "Strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(helmet());
app.use(createCsrfToken);
app.use(verifyCsrfTokenOnRoutes);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy.Strategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connectToDB();

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api", csrfRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
