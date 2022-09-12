import express from "express";

const logoutRouter = express.Router();

/**
 * @swagger
 * /logout:
 *  post:
 *    summary: User logout
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Empty object
 *        content:
 *          application/json:
 *            null
 */
logoutRouter.post("/logout", (req, res) => {
  req.session = null;
  res.json({});
});

export { logoutRouter };
