import { Router } from "express";
const router = Router();

import userRouter from "./User";
import storiesRouter from "./Stories";

router.get("/", (req, res) => {
  res.send("This api is reserved for medium clone");
});

router.use("/user", userRouter);
router.use("/stories", storiesRouter);

export default router;
