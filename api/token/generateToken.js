import Jwt from "jsonwebtoken";

const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default generateToken;
