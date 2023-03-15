import express from "express";

// Import Controller
import {
  handleGetRoot,
  getUsers,
  Login,
  Logout,
  Register,
} from "../controller/Users.js";
import { refreshToken } from "../controller/RefreshToken.js";

// Import Middlewares
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();
const prefix = "/v1/api";

// Welcome API
router.get(prefix, handleGetRoot);

// AUTH API
router.get(prefix + "/users", verifyToken, getUsers);
router.get(prefix + "/token", refreshToken);
router.post(prefix + "/reg", Register);
router.post(prefix + "/login", Login);
router.delete(prefix + "/logout", Logout);

export default router;
