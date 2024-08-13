import { ONE_DAY } from '../constants/index.js';
import {
  registerUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
} from '../services/auth.js';
import createHttpError from 'http-errors';

const setupSessionCookies = (res, session, expiresIn = ONE_DAY * 30) => {
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + expiresIn),
  };

  res.cookie('refreshToken', session.refreshToken, options);
  res.cookie('sessionId', session._id, options);
};

export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    next(
      createHttpError(500, 'Failed to register user', { data: error.message }),
    );
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const session = await loginUser(req.body);

    setupSessionCookies(res, session, ONE_DAY);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(createHttpError(401, 'Login failed', { data: error.message }));
  }
};

export const refreshUserSessionController = async (req, res, next) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSessionCookies(res, session);

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(
      createHttpError(401, 'Failed to refresh session', {
        data: error.message,
      }),
    );
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, 'Failed to logout', { data: error.message }));
  }
};
