const express = require("express");
const router = express.Router();

const Day = require("../models/day").model;

router.post("/", function (req, res, next) {
  console.log(req.body);
  const dateTime = req.body.date;
  Day.find({ date: dateTime }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        console.log("Datetime exists!");
        res.status(200).send(docs[0]);
      } else {
        // Initialize list of tables
        const allTables = require("../data/allTables");
        const day = new Day({
          date: dateTime,
          tables: allTables,
        });
        day.save((err) => {
          if (err) {
            res.status(400).send("Error saving new date");
          } else {
            console.log("Created new datetime!");
            Day.find({ date: dateTime }, (err, docs) => {
              err ? res.sendStatus(400) : res.status(200).send(docs[0]);
            });
          }
        });
      }
    } else {
      res.status(400).send("Could not search for date");
    }
  });
});

module.exports = router;
