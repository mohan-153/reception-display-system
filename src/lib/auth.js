import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET;

export function createToken(data) {

  return jwt.sign(
    data,
    SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
}

export function verifyToken(token) {

  try {

    return jwt.verify(
      token,
      SECRET_KEY
    );

  } catch (error) {

    return null;
  }
}