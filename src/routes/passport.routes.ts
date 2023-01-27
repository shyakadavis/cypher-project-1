import { Request, Response, Router } from 'express';
import { isLoggedIn } from '../middleware/auth';
import passport from 'passport';
const passportRouter = Router();

// 🍀 this is the actual route that will be hit so as to login with google. 🍀

passportRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

/*
The rest is to demo a working version of it.
*/

/* 📂 Start of demo 🤺 */

// example of a protected route, passed in between is the 'isLoggedIn' middleware.
passportRouter.get('/protected', isLoggedIn, (req: Request, res: Response) => {
  const currentUser = req.user;
  if (currentUser) {
    //@ts-ignore
    res.send(`Hello ${currentUser.displayName}`);
  }
});

// authentication pages with a link to log in
passportRouter.get('/auth', (req: Request, res: Response) => {
  res.send('<a href="/api/v1/auth/google">Log in with Google</a>');
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
