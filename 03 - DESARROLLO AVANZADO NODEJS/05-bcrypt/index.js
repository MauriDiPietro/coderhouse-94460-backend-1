//inicializar proyecto de node: npm init -y
//instalar bcrypt: npm i bcrypt

const fs = require("node:fs");
const bcrypt = require("bcrypt");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8"); // [{"email": "---"}] //formato json
        return JSON.parse(users); //formato js
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (obj) => {
    try {
      const users = await this.getUsers();
      //formato js
      const user = {
        ...obj,
      };
      user.password = bcrypt.hashSync(user.password, 10);
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users)); //guardar en formato json
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (email, password) => {
    const users = await this.getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Invalid credentials");
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) throw new Error("Invalid credentials");
    return "Login OK";
  };
}

const userManager = new UserManager("./users.json");

const test = async () => {
  await userManager.register({ email: "juan@mail.com", password: "1234" });
  await userManager.register({ email: "mariano@mail.com", password: "12345" });
  console.log(await userManager.getUsers());
  console.log(await userManager.login("juan@mail.com", "1234"));
};

test();


