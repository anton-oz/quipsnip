export default class AuthService {
  static getProfile(): string;
  static loggedIn(): boolean;
  static isTokenExpired(token: string): boolean;
  static getToken(): string | null;
  static login(idToken: string): void;
  static logout(): void;
}

// declare module "./auth"
