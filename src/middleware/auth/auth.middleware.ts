import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import GoogleStrategy0, { VerifyCallback } from 'passport-google-oauth2';
const GoogleStrategy = GoogleStrategy0.Strategy;
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
      return done(null, profile);
    },
  ),
);
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  req.user
    ? next()
    : res
        .status(401)
        .json({ status: 401, success: false, message: `You need to login` });
};
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
