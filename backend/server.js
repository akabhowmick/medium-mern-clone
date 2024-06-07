if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express, { json, static } from "express";
import cors from "cors";
import { join } from "path";
const app = express();
import router from "./routers";
import { json as _json, urlencoded } from "body-parser";
const PORT = process.env.PORT || 80;

import { connect } from "./db";
connect();

app.use(_json({ limit: "500mb" }));
app.use(urlencoded({ extended: true, limit: "500mb" }));

app.use(json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*")
  next();
});

app.use("/api", router);
app.use("/uploads", static(join(__dirname, "/../uploads")));
app.use(static(join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to Medium Clone 3.0");
  }
});

app.use(cors());

app.listen(PORT, () => {
  console.log(`Medium Clone 3.0 API is running on PORT No- ${PORT}`);
});