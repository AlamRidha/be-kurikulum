var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { CapaianPembelajaran } = require("../models");

const v = new Validator();

// ------------------- Capaian Pembelajaran -------------------
// get all data capaian pembelajaran
router.get("/:idMp/capaian_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const capaian_pembelajaran = await CapaianPembelajaran.findAll({
    where: { idMp: idMp },
  });
  res.send(capaian_pembelajaran);
});

// create data capaian pembelajaran
router.post("/:idMp/capaian_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const schema = {
    elemen: "string",
    capaian_pembelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const capaian_pembelajaran = await CapaianPembelajaran.create({
    elemen: req.body.elemen,
    capaian_pembelajaran: req.body.capaian_pembelajaran,
    idMp: idMp,
  });

  res.status(201).json(capaian_pembelajaran);
});

// delete capaian pembelajaran
router.delete("/capaian_pembelajaran/:idCp", async (req, res) => {
  const idCp = req.params.idCp;
  const capaian_pembelajaran = await CapaianPembelajaran.findByPk(idCp);

  if (!capaian_pembelajaran) {
    return res
      .status(404)
      .json({ msg: "Capaian Pembelajaran tidak ditemukan" });
  }

  await capaian_pembelajaran.destroy();
  res.json({
    msg: "Capaian Pembelajaran berhasil dihapus",
  });
});

// update capaian pembelajaran
router.put("/capaian_pembelajaran/:idCp", async (req, res) => {
  const idCp = req.params.idCp;
  let dataCapaian = await CapaianPembelajaran.findByPk(idCp);

  if (!dataCapaian) {
    return res
      .status(400)
      .json({ msg: "Capaian Pembelajaran tidak ditemukan" });
  }

  const schema = {
    elemen: "string|optional",
    capaian_pembelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  dataCapaian = await dataCapaian.update(req.body);
  res.json(dataCapaian);
});

module.exports = router;
