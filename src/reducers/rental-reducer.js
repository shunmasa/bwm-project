import {FETCH_RENTALS,FETCH_RENTAL_BY_ID_SUCCESS,
FETCH_RENTAL_BY_ID_INIT } from '../actions/types';

const INITIAL_STATE = {
  rentals:{
    data:[]
  },
  rental:{
    data:{}
  }
}

//state = rentals object//data[] as default
export const rentalReducer = (state=INITIAL_STATE.rentals,action) =>{
  switch(action.type){
    case FETCH_RENTALS:
      return {...state, data:action.rentals}//state, data which wants to sent
   
      default:
      return state;
  }
}
//case FETCH_RENTALS is not string

export const selectedRentalReducer = (state=INITIAL_STATE.rental,action)=>{
  switch(action.type){
  case FETCH_RENTAL_BY_ID_INIT:
    return {...state,data:{}};
 case FETCH_RENTAL_BY_ID_SUCCESS:
   return Object.assign({},state,{data:action.rental})//same way of below
   // return {...state, data:action.rental}//return new state and copy of state 
 default:
      return state;
      
  }
}