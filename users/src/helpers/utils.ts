import crypto from "node:crypto";
import { Entity, RecoveryToken, RecoveryTokenModel, User } from "../models";
import path from "path";
import { promises as fs } from "fs";
import { sendMail } from "../config/email";
import Handlebars from "handlebars";

export const randomTokenString = () => crypto.randomBytes(40).toString("hex");

export const readFile = (path: string) =>
  fs.readFile(path, { encoding: "utf-8" });

export const generateRecoveryToken = (user: string) => {
  let expiredAt = new Date();
  expiredAt.setHours(
    expiredAt.getHours() + parseInt(process.env.ACTIVATION_TOKEN_MAX_AGE!)
  );

  return new RecoveryTokenModel({
    user,
    token: randomTokenString(),
    expires: expiredAt.getTime(),
  });
};

// Function for sending a recovery password email to the user
export const sendMailRecoveryPassword = async (
  user: User,
  recoveryToken: RecoveryToken
) => {
  try {
    const htmlTemplatePath = path.join(
      __dirname,
      "..",
      "public",
      "template",
      "recoveryPassword.html"
    );
    const htmlTemplate = await readFile(htmlTemplatePath);
    const template = Handlebars.compile(htmlTemplate);
    const replacements = {
      firstName: (user.entity as Entity).firstname,
      token: recoveryToken.token,
      expires: new Date(recoveryToken.expires).toLocaleDateString(),
      // TODO: Change URL on production
      frontendUri: "https://cafeterias.dev",
      actionType: "Crear nueva contraseña",
    };
    const htmlToSend = template(replacements);
    await sendMail({
      to: user.email,
      html: htmlToSend,
    });
  } catch (error) {
    console.error(error);
  }
};
