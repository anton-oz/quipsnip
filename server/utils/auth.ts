import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { config } from "dotenv";
config();

interface CustomJwtPayload extends jwt.JwtPayload {
  _id: ObjectId | string;
  username: string;
}

class TokenGenerator {
  private readonly secretOrPrivateKey: string;
  public readonly secretOrPublicKey: string;
  private options?: jwt.SignOptions;

  constructor(options?: jwt.SignOptions) {
    this.secretOrPrivateKey = process.env.SECRET || "";
    this.secretOrPublicKey = process.env.PUB_SECRET || "";
    this.options = options;
  }

  private isJwtPayload(payload: any): payload is jwt.JwtPayload {
    return (
      typeof payload === "object" &&
      payload !== null &&
      "iat" in payload && // Check for a property that is expected in JwtPayload
      "exp" in payload
    );
  }

  private sign(payload: CustomJwtPayload, signOptions: jwt.SignOptions): string {
    if (this.secretOrPrivateKey === "" || this.secretOrPublicKey === "")
      throw new Error("Kerror");
    const jwtSignOptions = Object.assign({}, this.options, signOptions);
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  public refresh(
    token: string,
    verifyOptions?: jwt.VerifyOptions,
    refreshOptions?: jwt.SignOptions
  ): string {
    const payload: string | jwt.JwtPayload | jwt.Jwt = jwt.verify(
      token,
      this.secretOrPrivateKey,
      verifyOptions
    );
    if (!this.isJwtPayload(payload)) {
      return "{ error: 'invalid payload' }";
    }
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
    const jwtSignOptions = Object.assign({}, this.options, refreshOptions);
    // The first signing converted all needed options into claims, they are already in the payload
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  public issueTokens(
    payload: CustomJwtPayload,
    accessTokenOptions: jwt.SignOptions,
    refreshTokenOptions: jwt.SignOptions
  ): { token: string; refreshToken: string } {
    const accessOptions = Object.assign({}, this.options, accessTokenOptions);
    const refreshOptions = Object.assign({}, this.options, refreshTokenOptions);
    const token = this.sign(payload, accessOptions);
    const refreshToken = this.sign(payload, refreshOptions)
    return { token, refreshToken };
  }
}

export default TokenGenerator;
