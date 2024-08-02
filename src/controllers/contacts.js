// import {
//   getAllContacts,
//   getContactById,
//   createContact,
//   patchContact,
//   deleteContact,
// } from '../services/contacts.js';
// import { parsePaginationParams } from '../utils/parsePaginationParams.js';
// import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

// import createHttpError from 'http-errors';

// export const getContactsController = async (req, res) => {
//   const { page, perPage } = parsePaginationParams(req.query);
//   const { sortBy, sortOrder } = parseSortParams(req.query);
//   const filter = parseFilterParams(req.query);

//   const contacts = await getAllContacts({
//     page,
//     perPage,
//     sortBy,
//     sortOrder,
//     filter,
//   });
//   res.json({
//     status: 200,
//     message: 'Successfully found contacts!',
//     data: contacts,
//   });
// };

// export const getContactByIdController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await getContactById(contactId);

//   if (!contact) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// export const createContactController = async (req, res) => {
//   const contact = await createContact(req.body);

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: contact,
//   });
// };

// export const patchContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await patchContact(contactId, req.body);

//   if (!result) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: 'Successfully patched a contact!',
//     data: result.contact,
//   });
// };

// export const deleteContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const delContact = await deleteContact(contactId);

//   if (!delContact) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.status(204).send();
// };


import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await patchContact(id, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const delContact = await deleteContact(id);

  if (!delContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
