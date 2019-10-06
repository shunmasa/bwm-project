import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Header } from "./shared/Header";


import { Provider } from "react-redux";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import "App.css";


//inport store with init funciton 
const store = require('./reducers').init();
//* as import all component
class App extends Component {
  //home page "/" return redirect to rentalList page


  render() {
  
    //list path store in the link
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />

            <div className="container">
              <Route
                exact
                path="/"
                render={() => <Redirect to="/rentals" />}
              />
              <Route exact path="/rentals" component={RentalListing} />
              <Route exact path="/rentals/:id" component={RentalDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
