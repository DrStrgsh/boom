import { Cookies } from 'react-cookie';
const cookies = new Cookies();
class Auth {
  static authenticateToken(token) {
    cookies.set('token', token);
  }

  static isUserAuthenticated() {
    return !!cookies.get('token');
  }

  static deauthenticateUser() {
    cookies.remove('token');
  }

  static getToken() {
    return cookies.get('token');
  }
}

export default Auth;
