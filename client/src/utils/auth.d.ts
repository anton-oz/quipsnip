export default class AuthService {
  static login(token: any) {
    throw new Error("Method not implemented.");
  }
  getProfile(): string;
  loggedIn(): [ObjectId, boolean];
  isTokenExpired(token: string): boolean;
  getToken(): string | null;
  login(idToken: ObjectId): void;
  logout(): void;
}

// declare module "./auth"
