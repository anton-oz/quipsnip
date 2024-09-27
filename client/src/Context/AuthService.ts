import { jwtDecode } from "jwt-decode";

export class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return { error: "error getting token" };
    return jwtDecode(token);
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string) {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return { error: "Authentication Error" };
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(token: string) {
    localStorage.setItem("id_token", token);
    window.location.assign("/post");
  }

  async logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}
