import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
   
    const details = err.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
      type: detail.type,
      context: detail.context,
    }));
    res.status(400).json({
      status: 400,
      message: 'Bad Request',
      data: details,
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message || err.name,
      data: null,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: err.message || 'An unexpected error occurred',
  });
  next();
};
