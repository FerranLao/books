import bcrypt from "bcrypt";

export default async (password, hashedPass) => await bcrypt.compare(password, hashedPass);
