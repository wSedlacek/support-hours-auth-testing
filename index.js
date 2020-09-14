// @ts-check

const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
dotenv.config();
const app = express();

const dataRouter = require("./routes/data.routes");
const authRouter = require("./routes/auth.routes");

const authMiddleware = require("./middleware/auth.middleware");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/data", authMiddleware, dataRouter);

app.listen(3000, () =>
  console.log("Listening on port http://localhost:3000...")
);
