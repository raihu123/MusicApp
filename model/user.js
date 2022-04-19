class User{
  constructor(username,password) {
    this.username = username;
    this.password = password;
  }

  static fetchAll(){
    return users;
  }


}
let users = [new User("k", "123"), new User("t", "1234")];
module.exports = User;
