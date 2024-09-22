import express, { Request, Response } from "express";
import { verifyCsrfToken } from "../middleware.js";

const router = express.Router();

router.get("/csrf-token", (req: Request, res: Response) => {
  // @ts-ignore
  const csrfToken = req.session.csrfToken;
  res.cookie("csrfToken", csrfToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  res.json({ csrfToken: csrfToken });
});

router.post("/test-csrf", verifyCsrfToken, (req: Request, res: Response) => {
  res.send("CSRF token is valid, request processed successfully.");
});

export default router;
