import { FETCH_RENTALS,
   FETCH_RENTAL_BY_ID_SUCCESS,
   FETCH_RENTAL_BY_ID_INIT
  } from "./types";
//Rental listing ids are numbers and they need to be strings
const rentals = [
  {
    id: "1",
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: "2",
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: "3",
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: "4",
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
  }
];

const fetchRentalByIdInit = () =>{
  return {
    type: FETCH_RENTAL_BY_ID_INIT
}
}

//no data so componentWillMount and dispatch fetchRentals
export const fetchRentals = () => {
  //store rental data
  return {
    type: FETCH_RENTALS,
    rentals
  };
};

//find Rental By ID in a array and send it in the action
//complete Reducer similer as we did rentalReducer
  //find by rentals.id but need to change string from number since data id is not number

export const fetchRentalById = rentalId => {
  //call back dispatch after 1000
  return function(dispatch){
    dispatch(fetchRentalByIdInit())
//SEND REQUEST TO SERVER,ASYNC CODE//Simulate server call
  setTimeout(() => {
    const rental = rentals.find(rental => rental.id.toString() === rentalId);
    dispatch(fetchRentalByIdSuccess(rental))//fetch the data from fetchRentalByIdSuccess
  }, 1000);
}
};



const fetchRentalByIdSuccess = (rental)=>{
  return {
    type:FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}