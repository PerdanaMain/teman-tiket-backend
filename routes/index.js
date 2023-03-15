import express from "express";

// Import Controller
import { handleGetRoot } from "../controller/Users.js";

const router = express.Router();
const prefix = "/v1/api";

// Welcome API
router.get(prefix, handleGetRoot);

export default router;
