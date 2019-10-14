
import {FETCH_RENTAL_BY_ID_SUCCESS,
FETCH_RENTAL_BY_ID_INIT,
FETCH_RENTALS_SUCCESS,
FETCH_RENTALS_INIT,
FETCH_RENTALS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  rentals:{
    data:[],
    errors:[]
  },
  rental:{
    data:{},
    errors:[]
  }
}
//dispatch can use data 
//state = rentals object//data[] as default
export const rentalReducer = (state=INITIAL_STATE.rentals,action) =>{
  switch(action.type){
  case FETCH_RENTALS_INIT:
     return {...state,data:[],errors:[]};
    case FETCH_RENTALS_SUCCESS:
      return {...state, data:action.rentals}//state, data which wants to sent
    case FETCH_RENTALS_FAIL:
      return Object.assign({},state,{errors:action.errors,data:[]})
      default:
      return state;
  }
}
//case FETCH_RENTALS is not string
//array ->dispatch ->map or forEach {...state} or Object.assign{}
export const selectedRentalReducer = (state=INITIAL_STATE.rental,action)=>{
  switch(action.type){
  case FETCH_RENTAL_BY_ID_INIT:
    return {...state,data:{}};//mapstatetodispatch state 
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return Object.assign({}, state, { data: action.rental});//same way of below
   
      // return {...state, data:action.rental}//return new state and copy of state 
 default:
      return state;
      
  }
}