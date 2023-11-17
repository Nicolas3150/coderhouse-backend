class User {
  putUsername(username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}

const username = new User();

export default username;
