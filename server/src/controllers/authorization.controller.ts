import {auth, StatusCode} from '../utils/types/index';
import UserService from '../services/user.service';
import {sendError, validateRequest, validateUserAgent} from './../utils/Util';
import ApiError from './../utils/ApiError';

export class Controller {
  static async Registration(
    req: auth.Request<auth.RegistrationRequestBody>,
    res: auth.Response<auth.RegistrationResponseBody>
  ) {
    try {
      validateRequest(req);
      validateUserAgent(req.body.userAgent);
      const userData = await UserService.Registration(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN),
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      sendError(err, res);
      return;
    }
  }
  static async Activation(
    req: auth.Request<undefined, auth.ActivationRequestParam>,
    res: auth.Response
  ) {
    try {
      const {activationLink} = req.params;
      await UserService.Activation(activationLink);
      return res.redirect(process.env.CLIENT_REDIRECT_URI);
    } catch (err) {
      sendError(err, res);
    }
  }
  static async Login(
    req: auth.Request<auth.LoginRequestBody>,
    res: auth.Response
  ) {
    try {
      validateRequest(req);
      validateUserAgent(req.body.userAgent);
      const userData = await UserService.Login(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN),
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      sendError(err, res);
      return;
    }
  }
  static async Logout(
    req: auth.Request,
    res: auth.Response<auth.LogoutResponseBody>
  ) {
    try {
      const {refreshToken} = req.cookies;
      if (!refreshToken || typeof refreshToken !== 'string') {
        throw new ApiError(
          StatusCode.UNAUTHORIZED,
          'You need to log in to exit'
        );
      }
      const token = await UserService.Logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (err) {
      sendError(err, res);
      return;
    }
  }
}
