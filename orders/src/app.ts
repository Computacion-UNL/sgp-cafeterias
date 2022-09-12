import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import {
  currentUser,
  errorHandler,
  mongoErrorHandler,
  NotFoundError,
} from "@cafetho/shared";
import { routes } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);
routes(app);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(mongoErrorHandler);
app.use(errorHandler);
export { app };
