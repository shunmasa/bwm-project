import React from "react";
import {RentalList} from './RentalList';
import { connect } from "react-redux";
import * as actions from "actions";




class RentalListing extends React.Component {
  

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={this.props.rentals}/>
      </section>
    );
  }
}
//anything data <= reducer <- store
function mapStateToProps(state) {
  return {
    rentals: state.rentals.data 
  }; //rentals(anything) accessible to rentals
  //rental-reducer  data:actions.rentals access to this data to send out
}

export default connect(mapStateToProps)(RentalListing);

//bind {()=>{this.addRenatal()}} with anonimous funct
