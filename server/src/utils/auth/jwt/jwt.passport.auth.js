/*
 * JWT OAuth Strategy by Passport.js
 *
 **/

// ---------------------------------------------------------

import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUserById } from "../auth-crud/auth.curd.prisma";

// ---------------------------------------------------------

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
  issuer: process.env.ISSUER,
  audience: process.env.AUDIENCE,
};

// ---------------------------------------------------------

const verifyCallBack = async (jwtPayload, done) => {
  try {
    const user = await findUserById({ id: jwtPayload?.id });
    if (!user) return done(null, false);

    return done(null, user);
  } catch (err) {
    console.error({ err });
    return done(err, false);
  }
};

// ---------------------------------------------------------

export default new JwtStrategy(options, verifyCallBack);
