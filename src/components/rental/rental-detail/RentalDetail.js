import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import { RentalDetailInfo } from "./RentalDetailInfo";
import {RentalMap} from './RentalMap'
import {Booking} from'components/booking/Booking'
//props.data

export class RentalDetail extends React.Component {
  //dispatch the action
  componentWillMount() {
    const rentalId = this.props.match.params.id; //need ID of props
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  //paraent path id as props //use rental props
  render() {
    const rental = this.props.rental;
    //console.log(this.props)
    //console.log(this.props.math.id)
    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt=""></img>
              </div>
              <div className="col-md-6">
             <RentalMap location={`${rental.city},${rental.street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalDetailInfo rental={rental} />
              </div>
              <div className="col-md-4">
              
                <Booking rental={rental}/>
              
                 </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <h1>.....Loading</h1>;
    }
  }
}
//pass the rental
//settimeout dispatch ....loading 1 sec redux thunk
//access data in reducer
function mapStateToProps(state) {
  return {
    rental: state.rental.data
  };
}

export default connect(mapStateToProps)(RentalDetail);
