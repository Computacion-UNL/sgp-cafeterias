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

//Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);
app.use(currentUser);
const specs = swaggerJsDoc(options);

routes(app);
app.use("/api/users/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(mongoErrorHandler);
app.use(errorHandler);
export { app };
