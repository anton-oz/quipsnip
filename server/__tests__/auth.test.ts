import TokenGenerator from "../utils/auth";
import jwt from "jsonwebtoken";

let TestTokenGen: TokenGenerator;

beforeEach(() => {
  jest.useFakeTimers();
  TestTokenGen = new TokenGenerator();
});

afterEach(() => {
  jest.runOnlyPendingTimers(); // Clean up any pending timers
  jest.useRealTimers(); // Restore real timers
});

describe("TokenGenerator", () => {
  it("Tokens Properly Expire", () => {
    const username = "testuser";
    const _id = "605c72f6b2a5f9d2c8b5f0e4";
    const tokenExpireTime = 15 * 60 * 1000; // 15 minutes
    const refreshTokenExpireTime = 3 * 24 * 60 * 60 * 1000; // 3 days
    const { token, refreshToken } = TestTokenGen.issueTokens(
      { username, _id },
      { expiresIn: `${tokenExpireTime}` },
      { expiresIn: `${refreshTokenExpireTime}` }
    );
    // function to check if decode is valid
    const isValidToken = (
      decoded: string | jwt.JwtPayload | null
    ): decoded is { exp: number } => {
      return (
        typeof decoded === "object" && decoded !== null && "exp" in decoded
      );
    };

    const decodedToken = jwt.decode(token);
    const decodedRefreshToken = jwt.decode(refreshToken);
    let currentTime = Math.floor(Date.now() / 1000); // both tokens should not be expired at this point
    if (isValidToken(decodedToken)) {
      expect(decodedToken.exp).toBeGreaterThan(currentTime);
    }
    if (isValidToken(decodedRefreshToken)) {
      expect(decodedRefreshToken.exp).toBeGreaterThan(currentTime);
    }
    jest.advanceTimersByTime(tokenExpireTime + 2000); // + 2 seconds just to be safe that the token is expired
    currentTime = Math.floor(Date.now() / 1000); // only access token should be expired now
    if (isValidToken(decodedToken)) {
      expect(decodedToken.exp).toBeLessThan(currentTime);
    }
    if (isValidToken(decodedRefreshToken)) {
      expect(decodedRefreshToken.exp).toBeGreaterThan(currentTime);
    }
    jest.advanceTimersByTime(refreshTokenExpireTime);
    currentTime = Math.floor(Date.now() / 1000); // now refresh token should be expired
    if (isValidToken(decodedRefreshToken)) {
      expect(decodedRefreshToken.exp).toBeLessThan(currentTime);
    }
  });
});
