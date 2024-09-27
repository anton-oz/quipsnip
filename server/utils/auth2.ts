import jwt from "jsonwebtoken";

import { config } from "dotenv";
config();

class TokenGenerator {
  private secretOrPrivateKey: string;
  public secretOrPublicKey: string;
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

  sign(payload: jwt.JwtPayload, signOptions: jwt.SignOptions): string {
    if (this.secretOrPrivateKey === "" || this.secretOrPublicKey === "")
      throw new Error("Kerror");
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  refresh(token: string, refreshOptions?: jwt.VerifyOptions): string {
    const payload: string | jwt.JwtPayload | jwt.Jwt = jwt.verify(
      token,
      this.secretOrPrivateKey,
      refreshOptions
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
}

export default TokenGenerator;
