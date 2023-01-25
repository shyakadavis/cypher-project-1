import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// create an instance of express
const app: Application = express();

// tell app to listen on the port specified in the .env file, if it fails for some reason, listen on 3000
const PORT = process.env.PORT || 3000;

// configure dotenv. This is done once, don't re-configure it anywhere else.
dotenv.config();

/** Rules of our API */
app.use(cors());

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// hit this / route to test the health check of our api
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Welcome to team Cypher's API! \n Endpoints available at http://localhost:${PORT}/api/v1`,
  });
});

try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    // ✅ TypeScript knows error is Error
    console.log(`Error occurred: ${error.message}`);
  } else {
    console.log('Unexpected error', error);
  }
}
