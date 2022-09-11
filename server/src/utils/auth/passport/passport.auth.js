/**
 *  Passport Authentication
 *
 * @author justMario
 */

// ------------------------------------------------------------------

import passport from "passport";
import { findUserById } from "../auth-crud/auth.curd.prisma";
// import googlePassportStrategy from "../google-oauth/google.passport.auth.js";
// import githubPassportStrategy from "../github-oauth/github.passport.auth.js";
import jwtPassportStrategy from "../jwt/jwt.passport.auth";

// ------------------------------------------------------------------

// Strategies

// Google OAuth Strategy
// passport.use(googlePassportStrategy);

// GitHub OAuth Strategy
// passport.use(githubPassportStrategy);

// JWT OAuth Strategy
passport.use(jwtPassportStrategy);

// ------------------------------------------------------------------

const passportAuthenticate = (passport) => {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  // Strategies

  // Google OAuth Strategy
  // passport.use(googlePassportStrategy);

  // GitHub OAuth Strategy
  // passport.use(githubPassportStrategy);

  // JWT OAuth Strategy
  passport.use(jwtPassportStrategy);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  /* Serialize user
   * --------------------
   * determines which data of the user object should be stored in the session.
   * The result of the serializeUser method is attached to the session as user.id
   * take user  -> attach user.id in the session
   *
   **/
  passport.serializeUser((user, done) => done(null, user.id));

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  /* Deserialize user
   * --------------------
   * retrieve the whole user object by it's user id that has been stored
   * in the session by serializeUser
   * takes user.id return the whole user from the database
   *
   **/
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await findUserById({ id: userId });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      console.error({ err });
      return done(err, null);
    }
  });

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // Passport Auth Middleware
  return (req, res, next) =>
    passport.authenticate("jwt", (err, user, info) => {
      if (err) next(err);

      if (!user) {
        return res.status(401).json({ message: "Un-Authorized !" });
      }
      req.user = user;
      delete req.user.password;

      next();
    })(req, res, next);
};

// ------------------------------------------------------------------

export default passportAuthenticate;
