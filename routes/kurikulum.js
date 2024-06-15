var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { CapaianPembelajaran } = require("../models");
const { TujuanPembelajaran } = require("../models");

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

// get data capaian pembelajaran by id
router.get("/capaian_pembelajaran/:idCp", async (req, res) => {
  const idCp = req.params.idCp;
  const capaian_pembelajaran = await CapaianPembelajaran.findByPk(idCp);

  if (!capaian_pembelajaran) {
    return res
      .status(404)
      .json({ msg: "Capaian Pembelajaran tidak ditemukan" });
  }

  res.json(capaian_pembelajaran);
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

// ------------------- Tujuan Pembelajaran -------------------
// get all data tujuan pembelajaran
router.get("/:idMp/tujuan_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const tujuan_pembelajaran = await TujuanPembelajaran.findAll({
    where: { idMp: idMp },
  });
  res.send(tujuan_pembelajaran);
});

// get data tujuan pembelajaran by id
router.get("/tujuan_pembelajaran/:idTp", async (req, res) => {
  const idTp = req.params.idTp;
  const tujuan_pembelajaran = await TujuanPembelajaran.findByPk(idTp);

  if (!tujuan_pembelajaran) {
    return res.status(404).json({ msg: "Tujuan Pembelajaran tidak ditemukan" });
  }

  res.json(tujuan_pembelajaran);
});

// create data tujuan pembelajaran
router.post("/:idMp/tujuan_pembelajaran", async (req, res) => {
  const idMp = req.params.idMp;
  const schema = {
    elemen_capaian: "string",
    tujuan_pembelajaran: "string",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  const tujuan_pembelajaran = await TujuanPembelajaran.create({
    elemen_capaian: req.body.elemen_capaian,
    tujuan_pembelajaran: req.body.tujuan_pembelajaran,
    idMp: idMp,
  });

  res.status(201).json(tujuan_pembelajaran);
});

// delete tujuan pembelajaran
router.delete("/tujuan_pembelajaran/:idTp", async (req, res) => {
  const idTp = req.params.idTp;
  const tujuan_pembelajaran = await TujuanPembelajaran.findByPk(idTp);

  if (!tujuan_pembelajaran) {
    return res.status(404).json({ msg: "Tujuan Pembelajaran tidak ditemukan" });
  }

  await tujuan_pembelajaran.destroy();
  res.json({
    msg: "Tujuan Pembelajaran berhasil dihapus",
  });
});

// update tujuan pembelajaran
router.put("/tujuan_pembelajaran/:idTp", async (req, res) => {
  const idTp = req.params.idTp;
  let dataTujuan = await TujuanPembelajaran.findByPk(idTp);

  if (!dataTujuan) {
    return res.status(400).json({ msg: "Tujuan Pembelajaran tidak ditemukan" });
  }

  const schema = {
    elemen_capaian: "string|optional",
    tujuan_pembelajaran: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  // cek validasi
  if (validate.length) {
    return res.status(400).json(validate);
  }

  dataTujuan = await dataTujuan.update(req.body);
  res.json(dataTujuan);
});

module.exports = router;
