import {Router} from 'express';
import {Controller} from '../controllers/authorization.controller';
export const router = Router();

router.post('/registration', Controller.Registration);
