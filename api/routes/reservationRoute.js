const express = require("express");
const router = express.Router();

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

router.post("/", async (req, res) => {
  try {
    const day = await Day.findOne({ date: req.body.date });
    !day
      ? res.status(400).json("Day is not found!")
      : day.tables.forEach((table) => {
          if (table._id == req.body.table) {
            table.reservation = new Reservation({
              userId: req.body.userId,
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
            });
            table.isAvailable = false;
            const value = day.save();
            console.log("Reserved");
            res.status(200).json(value);
          }
        });

    // Day.find({ date: req.body.date }, (err, days) => {
    //   if (!err) {
    //     if (days.length > 0) {
    //       let day = days[0];
    //       day.tables.forEach((table) => {
    //         if (table._id == req.body.table) {
    //           // The correct table is table
    //           table.reservation = new Reservation({
    //             userId: req.body.userId,
    //             name: req.body.name,
    //             phone: req.body.phone,
    //             email: req.body.email,
    //           });
    //           table.isAvailable = false;
    //           const value = day.save();
    //           res.status(200).json(value);
    //         }
    //       });
    //     } else {
    //       console.log("Day not found");
    //     }
    //   }
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
