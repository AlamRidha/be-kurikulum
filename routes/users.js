var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Users } = require("../models");

const v = new Validator();

// create user
router.post("/", async (req, res, next) => {
  const schema = {
    nip: "string",
    nameUser: "string",
    password: "string|min: 5",
    email: "string",
    noHp: "string|max:13",
    bidangMataPelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // res.send("ok");
  const user = await Users.create(req.body);

  res.json(user);
});

// update data

router.get("/test", (req, res) => {
  res.json({
    msg: "Hello ini dunia",
  });
});

module.exports = router;
