import { createUser, findUserByNameOrEmail } from "../database/users";
import { validUser, checkPassword } from "../helpers/validations";
import { newToken } from "../passport";

export const signUp = async (req, res) => {
  if (!validUser(req.body)) {
    return res.status(402).send("invalid user");
  }
  try {
    const { email, validationCode } = await createUser(req.body);
    sendConfirmationMail(email, validationCode);
    res.status(200).send("user created");
  } catch (e) {
    if (e.status) return res.status(e.status).send(e.message);
    res.status(500).send("something happened");
  }
};
export const login = async (req, res) => {
  try {
    const token = await newToken();
    res.json({ token });
  } catch (e) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e.message);
    res.status(500).send("something happened");
  }
};
