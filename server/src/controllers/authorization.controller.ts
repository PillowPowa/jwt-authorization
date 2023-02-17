import {type auth, StatusCode} from '../utils/types/index';
import UserService from '../services/user.service';
import CustomError from './../utils/Error';

export class Controller {
  static async Registration(
    req: auth.Request<auth.RegistrationRequestBody>,
    res: auth.Response<auth.RegistrationResponseBody>
  ) {
    try {
      const userData = await UserService.Registration(req.body);
      if ('message' in userData) throw Error();
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN),
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      if (!(err instanceof CustomError)) {
        console.error(err);
        return res.json({
          message: 'Unahndled error occured!',
          code: StatusCode.INTERNAL_SERVER_ERROR,
        });
      }
      return res.json(err.toJSON());
    }
  }
}
