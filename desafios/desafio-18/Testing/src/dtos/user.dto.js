export default class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar;
    this.age = user.age;
  }
}
