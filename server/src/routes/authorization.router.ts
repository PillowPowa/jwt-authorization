import {Router} from 'express';
import {Controller} from '../controllers/authorization.controller';
import {body} from 'express-validator';

export const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('username').isString(),
  body('password').isLength({min: 6, max: 32}),
  body('userAgent').isString(),
  Controller.Registration
);
router.post(
  '/login',
  body('identifier').isString(),
  body('password').isString(),
  body('userAgent').isString(),
  Controller.Login
);
router.post('/logout', Controller.Logout);
router.get('/activate/:activationLink', Controller.Activation);
