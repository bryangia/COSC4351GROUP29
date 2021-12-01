const router = require("express").Router();
const Combine = require("../models/CombineAlert");

router.post("/", async (req, res) => {
  const newCombine = new Combine(req.body);

  try {
    const savedCombine = await newCombine.save();
    res.status(200).json(savedCombine);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
