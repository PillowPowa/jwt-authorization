import {Router} from 'express';
import {Controller} from '../controllers/authorization.controller';
import {body} from 'express-validator';

export const router = Router();

router.post(
  '/registration',
  body('email').isEmail().withMessage('Invalid email address entered'),
  body('username').isLength({min: 2}).withMessage('This field is required'),
  body('password')
    .isLength({min: 6, max: 32})
    .withMessage('The length of the password should be 6-32 characters'),
  Controller.Registration
);
router.post(
  '/login',
  body('identifier').isLength({min: 2}).withMessage('This field is required'),
  body('password')
    .isLength({min: 6, max: 32})
    .withMessage('This field is required'),
  Controller.Login
);
router.post('/logout', Controller.Logout);
router.get('/activate/:activationLink', Controller.Activation);
router.get('/refresh', Controller.Refresh);
