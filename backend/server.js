import express from "express";
import path from "path";
import router from "./routers";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./db";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 80;

connect();

app.use(json({ limit: "500mb" }));
app.use(urlencoded({ extended: true, limit: "500mb" }));

app.use(cors()); // Place cors middleware before any route handling

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*");
  next();
});

app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to Medium Clone 3.0");
  }
});

app.listen(PORT, () => {
  console.log(`Medium Clone 3.0 API is running on PORT No- ${PORT}`);
});
