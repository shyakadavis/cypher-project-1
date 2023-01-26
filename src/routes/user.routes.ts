import { Router, Request, Response } from 'express';

const userRouter = Router();

// GET - users
userRouter.get('/all', (req: Request, res: Response) =>
  res.status(404).json({
    message: 'Here',
  }),
);
// GET - users/:id
userRouter.get('/:id', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Working' });
});
// POST - users
userRouter.post('/', async (req: Request, res: Response) => {
  res.status(201).json({ message: 'Working' });
});

export default userRouter;
