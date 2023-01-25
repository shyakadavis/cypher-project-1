import User, { UserMap } from '../db/models/user.model';
import sequelizeConnection from '../db/config';
import { Router, Request, Response } from 'express';

const router = Router();

// GET - users
router.get('/users', async (req: Request, res: Response) => {
  UserMap(sequelizeConnection);
  const result = await User.findAll();
  res.status(200).json({ users: result });
}); // GET - users/:id
router.get('/user/:id', async (req: Request, res: Response) => {
  UserMap(sequelizeConnection);
  const id = Number(req.params.id);
  const result = await User.findByPk(id);
  res.status(200).json({ user: result });
}); // POST - users
router.post('/user', async (req: Request, res: Response) => {
  let newUser = req.body as User;
  UserMap(sequelizeConnection);
  const result = await User.create(newUser);
  newUser = result.dataValues as User;
  res.status(201).json({ user: newUser });
});

export default router;
