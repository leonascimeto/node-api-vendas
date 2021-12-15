import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserControllers from '../controllers/UserControllers';

const usersRouter = Router();
const usersControllers = new UserControllers();

usersRouter.get('/', usersControllers.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersControllers.create,
);

export default usersRouter;
