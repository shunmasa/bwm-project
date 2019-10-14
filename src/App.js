import React, { Component } from "react";
import { BrowserRouter, Route, Redirect,Switch } from "react-router-dom";
import Header from "./components/shared/Header";
import Login from 'components/login/Login';
import RentalSearchListing from 'components/rental/rental-listing/RentalSearchListing'
import {Register} from 'components/register/Register';
import {ProtectedRoute} from 'components/shared/auth/ProtectedRoute';
import {LoggedInRoute} from 'components/shared/auth/LoggedInRoute';
import { Provider } from "react-redux";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import 'App.css';
import * as actions from 'actions';
import {RentalCreate} from 'components/rental/rental-create/RentalCreate'

//inport store with init funciton 
const store = require('./reducers').init();
//* as import all component


class App extends Component {
  //home page "/" return redirect to rentalList page

 componentWillMount(){
  this.checkAuthState();
 }//use funciton 


 checkAuthState() {
  store.dispatch(actions.checkAuthState());
}

logout(){
  store.dispatch(actions.logout());
}//store logout // path the function as props this.logout

  render() {
  
    //list path store in the link
    return (
       <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout}/>

            <div className="container">
              <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/rentals" />}
              />
              <Route exact path="/rentals" component={RentalListing} />
              <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
              <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
              <ProtectedRoute exact path='/rentals/:id' component={RentalDetail} />
              <Route exact path='/login' component={Login} />
              <LoggedInRoute exact path='/register' component={Register} />
            </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
//same directory path (protected Route)and specific one is down .../rentals/new (top) ->/rentals/:id(down)