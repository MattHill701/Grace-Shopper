export function storeToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  
  export function getToken() {
    const myToken = JSON.parse(localStorage.getItem('token'));
    return myToken;
  }
  
  export function storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  export function getUser() {
    const myUser = JSON.parse(localStorage.getItem('user'));
    return myUser;
  }