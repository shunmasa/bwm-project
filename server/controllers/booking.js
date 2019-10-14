const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require("moment");

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;
  //in the middle ware assigned the res.locals.user //in booking controller provide data here
  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('users')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid User!",
              detail: "Cannot create booking on your Rental!"
            }
          ]
        });
      }
      //if booking(startAt ,endAt) and user id
      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        //check here for valid booking
        foundRental.bookings.push(booking);
       
        booking.save(function(err){
          //normarize error
          if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
          }
          foundRental.save(); //foundRental user.id
          //update id...push bookings key..booing
          User.update({_id:user.id},{$push:{bookings:booking}},function(){});
          return res.json({ startAt:booking.startAt,endAt:booking.endAt});
        });
      } else {
        return res.status(422).send({
          errors: [
            {
              error: "Invalid Booking!",
              detail: "Choosen dates are already taken"
            }
          ]
        });
      }
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    //The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
    //every return boolean
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }

  return isValid;
}

