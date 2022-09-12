import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export const transporter = nodemailer.createTransport({
  // TODO: Change for production
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cfae6086f8e5e2",
    pass: "684fbbeba176e6",
  },
});

/**
 * Function that allows send an email with default mail options
 * @param mailOptions
 * @returns
 */
export const sendMail = (mailOptions: MailOptions) => {
  const defaultMailOptions: MailOptions = {
    from: '"Cafetho" <cafetho@noreply.com>', // sender address
    subject: "CAFETHO", // Subject line
  };
  return transporter.sendMail({ ...defaultMailOptions, ...mailOptions });
};
