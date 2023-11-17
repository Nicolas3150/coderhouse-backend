import { Strategy } from "passport-local";
import { userService } from "../services/user.service.js";
import { hashPassword } from "../utils/hashPassword.js";
import { sendEmailToAdmin } from "../utils/messages.js";

const signUpStrategy = new Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const user = await userService.getByUsername(username);
      if (user) {
        return done("User already exists");
      }
      req.body.password = hashPassword(password);
      req.body.address = JSON.parse(req.body.address);
      const newUser = await userService.createUser(req.body);
      const message = `
          Nombre: ${newUser.firstName}
          Apellido: ${newUser.lastName}
          E-mail: ${newUser.email}
          Usuario: ${newUser.username}
          Direccion: ${newUser.address}
          Telefono: ${newUser.phone}
          Edad: ${newUser.age}`;
      await sendEmailToAdmin(message, "Nuevo registro");
      done(null, newUser);
    } catch (err) {
      done(err);
    }
  }
);

const getById = (id) => {
  const user = userService.getById(id);
  return user;
};

export const registerController = {
  signUpStrategy,
  getById,
};
