import axios from "axios";
import authService from 'services/auth-service';
import axiosService from 'services/axios-service'
import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "./types";
//Rental listing ids are numbers and they need to be strings
///Rentals Actions -------------------------------
const axiosInstance = axiosService.getInstance();


const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

//no data so componentWillMount and dispatch fetchRentals

const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};
const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  };
};
const fetchRentalsInit = () => {
  return{
     type:FETCH_RENTALS_INIT
  }
}
const fetchRentalsFail = (errors) =>{
  return {
     type:FETCH_RENTALS_FAIL,
     errors
  }
}
//fetchRentls dispatch fetchRentalsSuccess(rentals) data
//asyncroness code ...send data to backend syncoronessly after few seconds
export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance.get(url)
      .then(res => res.data )
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)))
  }
}

//find Rental By ID in a array and send it in the action
//complete Reducer similer as we did rentalReducer
//find by rentals.id but need to change string from number since data id is not number

export const fetchRentalById = rentalId => {
  //call back dispatch after 1000
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());
    //SEND REQUEST TO SERVER,ASYNC CODE//Simulate server call
    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data) //send data as res
      .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  };
};

export const createRental = (rentalData) => {
  return axiosInstance.post('/rentals', rentalData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

//axios is setimer asyncroness
// AUTH ACTION-------------------------
//register 
const loginSuccess = () => {
const username = authService.getUsername();
//authSevice = inport from auth-servicice
return{
type: LOGIN_SUCCESS,
    username
  }
}
 const loginFailure = (errors) =>{
 return {
   type:LOGIN_FAILURE,
   errors
 }
 }
 export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const checkAuthState = () =>{
  return dispatch =>{
    if(authService.isAuthenticated()){
      dispatch(loginSuccess());
    }
  }
    
}


export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {//login success setItem token
       authService.saveToken(token)//token save func from authService
        // localStorage.setItem('auth_token',token);
     //getItem //SetItem token storage function 
        dispatch(loginSuccess());
      })
      .catch(({response}) => {
        dispatch(loginFailure(response.data.errors));
      })
  }
}

export const logout =()=>{
  authService.invalidateUser();
  return{
    type:LOGOUT
  }
}
//send a token through axios to backend
export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
}
//.catch...Promise.reject() =catch.throw(error)