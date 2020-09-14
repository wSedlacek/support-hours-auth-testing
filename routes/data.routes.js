const express = require("express");
const dataDB = require("../models/data.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await dataDB.getAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ errorMessage: "you should really take a look at your network" });
  }
});

module.exports = router;
