import bcrypt from "bcrypt"
import User from "../models/User"

export default {
  findUserByNameOrMail: async data => {
    try {
      const user = await User.findOne({
        $or: [{ email: data }, { name: data }]
      });
      if (!user) throw { status: 400, message: "User not found" };
      return user;
    } catch (e) {
      throw e;
    }
  },
  createUser: async ({ name, password, email }) => {
    try {
      const exist = await User.findOne({ $or: [{ email }, { name }] });
      if (exist) throw { status: 400, message: "already exist" };
    } catch (e) {
      throw e;
    }
    try {
      const hash = await bcrypt.hashSync(password, salt);
      const user = await User.create({
        name,
        password: hash,
        email,
      });
      return user;
    } catch (e) {
      throw e;
    }
  }
};
