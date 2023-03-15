import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// DB Imports
import db from "../models/index.js";
const Users = db.user;
const Roles = db.role;

export const handleGetRoot = async (req, res) => {
  res.status(201).json({
    code: 201,
    status: "OK",
    msg: "Management API For Teman Tiket is Ready",
  });
};
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "role_id",
        "first_name",
        "last_name",
        "phone",
        "gender",
        "email",
        "photo",
      ],
      include: {
        model: Roles,
        as: "roles",
        attributes: ["id", "role_name"],
      },
    });
    res.status(201).json({
      code: 201,
      status: false,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};
export const Register = async (req, res) => {
  const {
    first_name,
    last_name,
    birthdate,
    gender,
    phone,
    email,
    password,
    confirm_password,
    role_id,
  } = req.body;

  const user = await Users.findAll({
    where: {
      email,
    },
  });
  if (user != "")
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Your email has been created before",
    });

  if (password !== confirm_password)
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Password and Confirm Password do not match!",
    });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      first_name,
      last_name,
      birthdate,
      gender,
      phone,
      email,
      password: hashPassword,
      role_id,
    });
    res.status(201).json({ msg: "Register Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Email or Password wrong" });
    const userId = user[0].id;
    const first_name = user[0].first_name;
    const last_name = user[0].last_name;
    const email = user[0].email;
    const role_id = user[0].role_id;
    const photo = user[0].photo;

    const accessToken = jwt.sign(
      { userId, first_name, last_name, email, role_id, photo },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, first_name, last_name, email, role_id, photo },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      code: 201,
      status: true,
      msg: "Login Successfully",
      accessToken,
    });
  } catch (error) {
    res.status(404).json({
      code: 400,
      status: false,
      msg: error.message,
    });
  }
};
export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
