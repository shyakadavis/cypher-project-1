import { NextFunction, Request, Response, Router } from 'express';
import { isLoggedIn } from '../middleware/auth';
import passport from 'passport';
const passportRouter = Router();

// 🍀 this is the actual route that will be hit so as to login with google. 🍀

passportRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

// login ⏭️
passportRouter.post(
  '/auth/login',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', function (err, user, info) {
      if (err) next(err);
      if (!user) {
        res.status(401).json({
          status: 401,
          success: false,
          message: `${info.message}`,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        data: user,
      });
    })(req, res, next);
  },
);
// login ⏭️
passportRouter.post(
  '/auth/signup',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', function (err, user, info) {
      if (err) next(err);
      if (!user) {
        res.status(401).json({
          status: 401,
          success: false,
          message: `${info.message}`,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        data: user,
      });
    })(req, res, next);
  },
);
/*
The rest is to demo a working version of it.
*/

/* 📂 Start of demo 🤺 */

// example of a protected route, passed in between is the 'isLoggedIn' middleware.
passportRouter.get('/protected', isLoggedIn, (req: Request, res: Response) => {
  const currentUser = req.user;
  console.log(currentUser);
  if (currentUser) {
    // @ts-ignore
    res.send(`Hello ${currentUser.surName} ${currentUser.givenName}`);
  }
});

// authentication pages with a link to log in
passportRouter.get('/auth', (req: Request, res: Response) => {
  res.send('<a href="/api/v1/auth/google">Use Google</a>');
});

// This is where a user will be redirected after signing in with google
passportRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/v1/protected',
    failureRedirect: '/api/v1/auth/failure',
  }),
);

// This where a user will be redirected when an error occurred while signing in
passportRouter.get('/auth/failure', (req: Request, res: Response) => {
  res.send('something went wrong..');
});

/* 🎪 End of demo 🎆 */

export default passportRouter;
