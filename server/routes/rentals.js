const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const UserCtrl = require("../controllers/user");
const { normalizeErrors } = require("../helpers/mongoose");
//post event action save
//get //data back from server and show data
//put update
router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

//find all the documentatino from Rental data usng argument FoundRentals send as Json
//catch the data in the database

//specify the id  //find by Id// //can check booking date refered to _id in renttal
router.get("/:id", function(req, res) {
  const rentalId = req.params.id;
  Rental.findById(rentalId)
    // - restlict not send to data base -.id not send id
    //send startAt,endAt in bookings
    .populate("user", "username -_id") //user column show username and dontinclude id
    .populate("bookings", "startAt endAt -_id")
    .exec(function(err, foundRental) {
      if (err) {
        res.status(422).send({
          errors: [{ title: "Rental Error!", detail: "Could not find Rental!" }]
        });
      }
      res.json(foundRental);
    });
});

router.post('', UserCtrl.authMiddleware, function(req, res) {
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
  const user = res.locals.user;

  const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate});
  rental.user = user;

  Rental.create(rental, function(err, newRental) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    User.update({_id: user.id}, { $push: {rentals: newRental}}, function(){});

    return res.json(newRental);
  });
});
//get get info to check data could send

router.get("", function(req, res) {
  //ternary if have the city toLowercase city objects ,if not {} objects
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};


  Rental.find(query)
      .select('-bookings')
      .exec(function(err, foundRentals) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (city && foundRentals.length === 0) {
      return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
    }

    return res.json(foundRentals);
  });
});

module.exports = router;
