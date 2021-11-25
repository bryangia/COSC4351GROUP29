const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const authRoute = require("./routes/auth");
const stripeRoute = require("./routes/stripe");
const paymentRoute = require("./routes/payment");
const availabilityRoute = require("./routes/availabilityRoute");
const reservationRoute = require("./routes/reservationRoute");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/availability", availabilityRoute);
app.use("/api/reserve", reservationRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/checkout", stripeRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
