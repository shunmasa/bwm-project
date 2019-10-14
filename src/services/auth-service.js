import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

//import everything as 
class AuthService{
  tokenKey = 'auth_token';
  // tokenKey = 'auth_token';
  
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  decode(token) {
    return jwt.decode(token);
  }
  //logout token
  invalidateUser(){
    localStorage.removeItem(this.tokenKey);
  }
//expire
  getExpiration(token) {
    const exp = this.decode(token).exp;
    return moment.unix(exp);
  }
  
 //save token
saveToken(token){
  localStorage.setItem('auth_token',token)
}  


//GetUsername
getUsername(){
  return this.decode(this.getToken()).username;
}

//decode ...get token and username

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }
//auth 
  isAuthenticated() {
    const token = this.getToken();

    return (token && this.isValid(token)) ? true : false;
  }
}


export default new AuthService();
