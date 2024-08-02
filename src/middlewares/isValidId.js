// import { isValidObjectId } from 'mongoose';
// import { HttpError } from 'http-errors';

// export const isValidId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     throw HttpError(404, 'Not found');
//   }

//   next();
// };

import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid ID format'));
  }

  next();
};
