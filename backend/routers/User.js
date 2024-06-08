import { Router } from "express";
import { default as mongoose } from "mongoose";
const router = Router();
import { create, find, findOne, findOneAndUpdate } from "../models/User";
import { findOne as _findOne } from "../models/Stories";

router.post("/", async (req, res) => {
  try {
    await create({
      displayName: req.body.displayName,
      email: req.body.email,
      providerId: req.body.providerId,
      photoURL: req.body.photoURL,
      uid: req.body.uid,
      phoneNumber: req.body.phoneNumber,
    })
      .then((data) => {
        res.status(201).send({
          status: true,
          data: data,
          message: "User created successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: `Error: Bad request - ${err.message}`,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Internal server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await find()
      .sort({ created_at: -1 })
      .then((doc) => {
        res.status(200).send({
          status: true,
          data: doc,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: `Error getting user ${err}`,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    await findOne({ email: req.params.uid })
      .then((doc) => {
        if (doc) {
          res.status(200).send({
            status: true,
            data: doc,
          });
        } else {
          res.status(200).send({
            status: false,
            message: "User not found",
            data: doc,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: `User not found ${err}`,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

router.post("/list/:id", async (req, res) => {
  console.log(req.body.userid, req.params.id);
  await findOneAndUpdate(
    { _id: req.body.userid },
    {
      $addToSet: {
        reading_list: req.params.id,
      },
    }
  )
    .then(() => {
      res.status(201).send({
        status: true,
        message: "Stories added to the reading list",
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: true,
        message: `Error while adding stories ${err}`,
      });
    });
});

router.get("/get-list/:id", async (req, res) => {
  let userData = await findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
  if (!userData) {
    throw "User data not found";
  }
  let reading_add = [];
  userData.reading_list.map(async (id) => {
    await _findOne({ _id: mongoose.Types.ObjectId(id) })
      .then((doc) => {
        reading_add.push(doc);
      })
      .catch((err) => {
        throw err.toString();
      });

    if (reading_add.length == userData.reading_list.length) {
      return res.status(200).send({
        status: true,
        data: reading_add,
      });
    }
  });
});

export default router;
