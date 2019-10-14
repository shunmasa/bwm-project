import { LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  username:''
 
}
//state = rentals object//data[] as default
//getUsername ..auth-reducer/send username to actions
export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {isAuth: true, errors: [],username:action.username}); //state, data which wants to sent
      case LOGIN_FAILURE:
          return Object.assign({}, state, {errors: action.errors});
      case LOGOUT:
          return Object.assign({}, state, {isAuth:false});//no more authenticate
        default:
      return state;
  }
};
