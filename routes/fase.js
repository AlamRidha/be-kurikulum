var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Fase } = require("../models");

const v = new Validator();

// get all data fase
router.get("/", async (req, res) => {
  const fase = await Fase.findAll();
  res.send(fase);
});

// create data fase
router.post("/", async (req, res) => {
  const schema = {
    namaFase: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const fase = await Fase.create(req.body);
  res.status(201).json(fase);
});

// delete fase
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const fase = await Fase.findByPk(id);

  if (!fase) {
    return res.status(404).json({ msg: "Fase tidak ditemukan" });
  }

  await fase.destroy();
  res.json({
    msg: "fase berhasil dihapus",
  });
});

module.exports = router;
