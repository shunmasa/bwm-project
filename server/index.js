const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const bodyParser = require("body-parser");
const FakeDb = require("./fake-db");
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
   const fakeDb = new FakeDb();
  // fakeDb.seedDb();
  })
  .catch(err => console.error(err));

const app = express();

//end point which is how to comunicate with app
app.use(bodyParser.json());
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("I am running");
});
