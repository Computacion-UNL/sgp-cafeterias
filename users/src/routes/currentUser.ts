import express from "express";

const currentUserRouter = express.Router();

currentUserRouter.get("/currentuser", (req, res) => {
  res.json({ currentUser: req.currentUser || null });
});

export { currentUserRouter };
