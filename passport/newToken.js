import jwt from "jsonwebtoken";

export default async user => {
  try {
    const token = await jwt.sign(
      {name:"Holi"},
      "secretito",
      { expiresIn: 24 * 60 * 60 }
    );
    return token;
  } catch (e) {
    throw new Error(e);
  }
};
