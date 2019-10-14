import React from "react";
import { withRouter } from "react-router-dom";

class RentalSearchInput extends React.Component {
  //react Ref
  constructor(){
    super();
    this.searchInput = React.createRef();//search input as ref
  }
  
  handleKeyPress(event){
   if(event.key === 'Enter'){
     this.handleSeacrch();
   }
  }
  //submit
  handleSeacrch(){
  const {history} = this.props;
  const city = this.searchInput.current.value;
  city ? history.push(`/rentals/${city}/homes`) : history.push('/rentals')

  }
  render() {
    return (
      <div className="form-inline my-2 my-lg-0">
        <input 
          onKeyPress={(event)=>this.handleKeyPress(event)}
          ref={this.searchInput}
          className="form-control mr-sm-2 bwm-search"
          type="search"
          placeholder="Try"
          aria-label="Search"
        ></input>
        <button
          onClick={()=>{this.handleSeacrch()}}
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit"
        >
          Search
        </button>
      </div>
    );
  }
}

export default withRouter(RentalSearchInput);
