import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";

//config
dotenv.config();

//initiate
const app = express();
app.use(cors());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
