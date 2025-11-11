const fs = require("node:fs");
const crypto = require("node:crypto");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(users);   //formato js
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
      user.secret = crypto.randomBytes(128).toString();
      user.password = crypto
        .createHmac("sha256", user.secret)
        .update(user.password)
        .digest("hex");
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users)) //guardar en formato json
      return user;
    } catch (error) {
        throw new Error(error);
    }
  };
}

const userManager = new UserManager("./users.json");

const test = async () => {
    await userManager.register({ email: "juan@mail.com", password: "1234" });
    await userManager.register({ email: "mariano@mail.com", password: "12345" });
    console.log(await userManager.getUsers());
}

test()
