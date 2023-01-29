import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import GoogleStrategy0, { VerifyCallback } from 'passport-google-oauth2';
import localStrategy0 from 'passport-local';
import { User } from '../../db/schemas';
import bcrypt from 'bcrypt';
/*  */
const GoogleStrategy = GoogleStrategy0.Strategy;
const LocalStrategy = localStrategy0.Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const PORT = process.env.PORT || 3000;
// google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/api/v1/google/callback`,
      passReqToCallback: true,
    },
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback,
    ) {
      try {
        const user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          const newUser = {
            surName: profile.family_name,
            givenName: profile.given_name,
            email: profile.email,
            password: process.env.USER_PASSWORD as string,
            googleId: profile.id,
            avatar: profile.photos[0].value,
          };
          const googleUser = await User.create(newUser);
          done(null, googleUser);
        } else {
          done(null, user);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(` 🔴 Error signing up user: 😟 ${error.message} 🔴`);
        } else {
          console.log('Unexpected error', error);
        }
      }
    },
  ),
);
/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: any) => {
      const user: any = await User.findOne({
        where: { email },
      });
      if (!user)
        return done(null, false, {
          message: `${email} not found 🙅‍♀️`,
        });
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
          return done(null, false, {
            message: `Password does not match given email 🤡`,
          });
      }
      const foundUser = {
        id: user.id,
        email: user.email,
        surName: user.surName,
        givenName: user.givenName,
      };
      return done(null, foundUser);
    },
  ),
);
/**
 * Sign up using local strategy.
 */
/* passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: any) => {
      const user: any = await User.findOne({
        where: { email },
      });
      if (!user)
        return done(null, false, {
          message: `${email} not found 🙅‍♀️`,
        });
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
          return done(null, false, {
            message: `Password does not match given email 🤡`,
          });
      }
      const foundUser = {
        id: user.id,
        email: user.email,
        surName: user.surName,
        givenName: user.givenName,
      };
​
      return done(null, foundUser);
    },
  ),
); */
/*  */
// middleware to check logged in users
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  req.user
    ? next()
    : res
        .status(401)
        .json({ status: 401, success: false, message: `You need to login` });
};
/*  */
/*  */
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
