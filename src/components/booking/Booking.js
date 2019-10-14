import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {ToastContainer,toast}from 'react-toastify';
import { getRangeOfDates } from "helpers";
import * as moment from 'moment';
import {BookingModal} from './BookingModal';
import * as actions from 'actions';
export class Booking extends React.Component {
  constructor() {
    super();
    this.bookedOutDates = [];
    this.dateRef = React.createRef();//need ref for apeareing date in the filed
   this.state = {
      proposedBooking:{
        startAt:'',
        endAt:'',
        guests:''
      },
      modal:{
        open:false
      },
      errors:[]
   }
    this.checkInvalidDates = this.checkInvalidDates.bind(this);
    this.handleApply = this.handleApply.bind(this)
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveRental = this.reserveRental.bind(this)
  }
  //props reantal ={rantal}
  componentWillMount() {
    this.getBookedOutDates();
  }
  //booking is forien key of rental
  getBookedOutDates() {
    const { bookings } = this.props.rental;
   
      if (bookings && bookings.length > 0) {
        bookings.forEach(booking => {
          const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
          this.bookedOutDates.push(...dateRange);
        });
      }
    }
      
  //check condition of kallender//diff diferent or includes
  checkInvalidDates(date) {
  if(this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0){
  return true;
  }
  return false
}//cross the date when the booking has been made 
handleApply(event, picker) {
  const startAt = picker.startDate.format('Y/MM/DD');
  const endAt = picker.endDate.format('Y/MM/DD');
//print the date //access value
this.dateRef.current.value = startAt + ' to ' + endAt;
//startAt and endAt ...''//rental will be undefined 
//so as initial value proposed:{startAt,endAt...} ===> render this object 
//like proposedBooking:{...this.state.proposedBooking} then XML booking={this.state.proposedBooking} path to children
  this.setState({
    proposedBooking:{
      ...this.state.proposedBooking,
      startAt,
      endAt
    }
  })
}

selectGuests(event){
  this.setState({
    proposedBooking:{
      ...this.state.proposedBooking,
      guests: parseInt(event.target.value, 10)
    }
  })//parse integer as string
}
cancelConfirmation() {
  this.setState({
    modal: {
      open: false
    }
  })
}
addNewBookedOutDates(booking){
  const dateRange = getRangeOfDates(booking.startAt,booking.endAt);
  this.bookedOutDates.push(...dateRange)
}

resetData(){
  //this.dateRef.current.value ....callender to take value
  this.dateRef.current.value = '';
  this.setState({proposedBookign:{guests:''}})
  

}



confirmProposedData(){
  const {startAt,endAt} = this.state.proposedBooking;
  const days = getRangeOfDates(startAt,endAt).length -1//dont count first date so -1
  const {rental} = this.props;
//...this.state.proposedbooking...rental is undefined because still empty object
//so need update in the blank object of rental ...this.state
  this.setState({
    proposedBooking:{
      ...this.state.proposedBooking,
       days,
       totalPrice:days * rental.dailyRate,
       rental
    },
    modal:{
      open:true
    }
  })
}
//proposedBooking...startAt,endAt....
reserveRental(){
  actions.createBooking(this.state.proposedBooking)
  .then((booking)=>{
    this.addNewBookedOutDates(booking);
    this.cancelConfirmation();//cancel
    this.resetData();//guests data will be 0
    toast.success('Booking has been successfully created')
  },
  (errors) => {
    this.setState({errors});
  })
}


  render() {
    const { rental } = this.props;
    //fix button
    const {startAt,endAt,guests} = this.state.proposedBooking;
    //this.state.proposedBooking.startAt or this.state.proposedBooking.endAt
    //if not inisital value of rental , it will be undefined 
    return (
      <div className="booking">
        <ToastContainer />
        <h3 className="booking-price">
          $ {rental.dailyRate}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr></hr>

        <div className="form-group">
          <label htmlFor="dates">Dates</label>

          <DateRangePicker onApply={this.handleApply}
          isInvalidDate={this.checkInvalidDates}
          opens="left" 
          containerStyles={{ display: "block" }}>
          <input id="dates"  ref={this.dateRef} type="text" className="form-control"></input>
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            onChange={(event)=>this.selectGuests(event)}
            value={guests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guests"
            placeholder=""
          ></input>
        </div>
        <button disabled={!startAt || !endAt || !guests}onClick={()=>this.confirmProposedData()}
          className="btn btn-bwm btn-confirm btn-block">
          Reserve place now
        </button>
        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal open={this.state.modal.open}
        booking={this.state.proposedBooking}
         closeModal={this.cancelConfirmation}
         confirmModal={this.reserveRental}
         errors={this.state.errors}
         rentalPrice={rental.dailyPrice}
         />
      </div>
    );
  }
}

//button disabled={!startAt || !endAt} ..if not startAt value ...buttun will be disabled
//send the data of proposedBooking in the booking Modal