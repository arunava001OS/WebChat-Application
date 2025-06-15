import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config("../");

const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      res
        .status(400)
        .json({ message: `emailId ${email} is already registered with us` });
      return;
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const user = new UserModel({ email, name, password: hashedPass });
    await user.save();

    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({
      message: "User created successfully",
      userId: user.email,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Registration fialed with error ${err}` });
  }
};
const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    res.status(400).json({ message: `User is not registered with us` });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res
      .status(400)
      .json({ message: `Password entered for ${user.email} is incorrect` });
    return;
  }
  const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(201).json({
    message: "User logged in successfully",
    userId: user.email,
    token: token,
  });
  return;
};
const logOut = (req, res) => {};

export { signUp, logIn, logOut };
