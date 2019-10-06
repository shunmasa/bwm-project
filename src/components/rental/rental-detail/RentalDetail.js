import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
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
    if (rental.id) {
      return (
        <div>
          <h1>{rental.title}</h1>
          <h1>{rental.city}</h1>
          <h1>{rental.description}</h1>
          <h1>{rental.dailyRate}$</h1>
        </div>
      );
    }else{
      return(
        <h1>.....Loading</h1>
      )
    }
  }
}
//settimeout dispatch ....loading 1 sec redux thunk
//access data in reducer
function mapStateToProps(state) {
  return {
    rental: state.rental.data
  };
}

export default connect(mapStateToProps)(RentalDetail);
