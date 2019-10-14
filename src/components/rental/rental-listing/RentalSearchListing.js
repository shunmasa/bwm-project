import React from "react";
import {RentalList} from './RentalList';
import { connect } from "react-redux";
import * as actions from "actions";
import {toUpperCase} from 'helpers'



class RentalSearchListing extends React.Component {
constructor(){
  super();
  this.state ={
   searchedCity:''  
  }
}
//one time execute 
  componentWillMount() {
    this.searchRentalsByCity()
  }
//more than one from will Mount// excute again same function from componentWillMount
componentDidUpdate(prevProps){
 const currentUrlParam = this.props.match.params.city;
 const prevUrlParam = prevProps.match.params.city;

 if(currentUrlParam !== prevUrlParam){
   this.searchRentalsByCity();//same func excute again 
 }
}
//when current value and prev value is not match , will be same func excuted 



 searchRentalsByCity(){
  const searchedCity = this.props.match.params.city;//link
  this.setState({searchedCity});
  this.props.dispatch(actions.fetchRentals(searchedCity))
}
 renderTitle(){
  const { errors, data } = this.props.rentals;
   const {searchedCity} = this.state;
  let title = '';

  if (errors.length > 0) {
    title = errors[0].detail;
  }
  if(data.length > 0){
    title = `Your Home in City of ${toUpperCase(searchedCity)}`;
  }//incase of Uppercase searching will be hitting for that 
return <h1 className="page-title">{title}</h1>
 }
  render() {
    return (
      <section id="rentalListing">
        
        <h1 className="page-title">
          {this.renderTitle()}
        </h1>
        <RentalList rentals={this.props.rentals.data}/>
      </section>
    );
  }
}
//anything data <= reducer <- store
function mapStateToProps(state) {
  return {
    rentals: state.rentals
  }; //rentals(anything) accessible to rentals
  //rental-reducer  data:actions.rentals access to this data to send out
}

export default connect(mapStateToProps)(RentalSearchListing);

//bind {()=>{this.addRenatal()}} with anonimous funct
