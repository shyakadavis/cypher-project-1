import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import sequelizeConnection from './db/config';
import routes from './routes/index';
import session from 'express-session';
import passport from 'passport';
import './middleware/auth/auth.middleware';

// connect to the db
// sequelizeConnection();

// create an instance of express
const app: Application = express();

// Handling Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// tell app to listen on the port specified in the .env file, if it fails for some reason, listen on 3000
const PORT = process.env.PORT || 3000;

export const get = () => {
  /** Rules of our API */
  app.use(cors());

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // hit this / route to test the health check of our api
  app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: `Welcome to team Cypher's API! \n Endpoints available at http://localhost:${PORT}/api/v1 + whatever endpoint you want to hit`,
    });
  });

  // the different routes that will be used.
  // don't directly add other routes here.
  // follow the pattern and export your router from a <name>.routes.ts file, head over to the index.ts in /routers and add it from there
  // it will be exported along with the others.
  app.use('/api/v1', routes);

  //middleware
  function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    req.user ? next() : res.sendStatus(401);
  }

  app.get('/auth', (req, res) => {
    res.send('<a href="/auth/google">Authentication with Google</a>');
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
  );

  // This is where a user will be redirected after signing in with google
  app.get(
    '/google/callback',
    passport.authenticate('google', {
      successRedirect: '/protected',
      failureRedirect: '/auth/failure',
    }),
  );

  // This where a user will be redirected when an error occured while signing in
  app.get('/auth/failure', (req: Request, res: Response) => {
    res.send('something went wrong..');
  });
  app.get('/protected', isLoggedIn, (req: Request, res: Response) => {
    const currentUser = req.user;
    if (currentUser) {
      res.send(`Hello ${currentUser}`);
    }
  });

  return app;
};

export const start = () => {
  const app = get();

  try {
    // all further routes can be accessed from here
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    // catch all un-found routes and send this response
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        message: "Route / page doesn't exist.",
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows error is Error
      console.log(`Error occurred: ${error.message}`);
    } else {
      console.log('Unexpected error', error);
    }
  }
};

void start();
