import { createTransport } from "nodemailer";
import config from "../config/config.js";
import logger from "./loggers.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.admin_email,
    pass: config.password,
  },
});

export const sendEmailToAdmin = async (message, asunto) => {
  const mailOptions = {
    from: "servidor ecommerce",
    to: config.admin_email,
    subject: asunto,
    html: message,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
};

export const sendEmailToClient = async (client_email, orden) => {
  const message = `Su orden con id: "${orden._id}" se  ha generado correctamente. Para mas informacion ingrese en ecommerce.`;
  const mailOptions = {
    from: "servidor ecommerce",
    to: client_email,
    subject: "Orden generada con exito",
    html: message,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
};
