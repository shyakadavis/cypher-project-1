import { Router } from 'express';
import userRouter from './user.routes';
import passportRouter from './passport.routes';

const router = Router();

router.use('/user', userRouter);
router.use(passportRouter);

export default router;
