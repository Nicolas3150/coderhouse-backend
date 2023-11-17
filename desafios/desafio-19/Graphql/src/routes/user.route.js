import UserController from "../controllers/user.controller.js";

class UserRoute {
  constructor() {
    this.controller = new UserController();
  }

  start() {
    return {
      register: this.controller.register,
      login: this.controller.login,
      getUser: this.controller.getUser,
      getUsers: this.controller.getUsers,
    };
  }
}

export default UserRoute;
