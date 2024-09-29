import { jwtDecode, JwtPayload } from "jwt-decode";

interface customJwtPayload extends JwtPayload {
  _id: string;
  username: string;
}

export class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return { error: "error getting token" };
    const decoded = jwtDecode(token);
    return decoded as customJwtPayload;
  }

  loggedIn() {
    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string) {
    const decoded = jwtDecode(token);
    // if (!decoded.exp) return { error: "Authentication Error" };
    if (!decoded.exp || decoded.exp < Date.now() / 1000) {
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

  refresh(token: string) {
    localStorage.setItem("id_token", token);
    return this.getToken();
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}
