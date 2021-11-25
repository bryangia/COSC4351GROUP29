const router = require("express").Router();
const Payment = require("../models/Payment");

router.post("/", async (req, res) => {
  const newPayment = new Payment(req.body);

  try {
    const savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
