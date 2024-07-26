import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Contacts retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    next(createHttpError(500, `Failed to retrieve contacts: ${error.message}`));
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  
  if (!isValidObjectId(contactId)) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: null,
    });
  }

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Contact with ID ${contactId} retrieved successfully`,
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, `Failed to retrieve contact: ${error.message}`));
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, `Failed to create contact: ${error.message}`));
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: null,
    });
  }

  try {
    const result = await patchContact(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Contact updated successfully',
      data: result.contact,
    });
  } catch (error) {
    next(createHttpError(500, `Failed to update contact: ${error.message}`));
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  // Validate ObjectId before querying the database
  if (!isValidObjectId(contactId)) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: null,
    });
  }

  try {
    const delContact = await deleteContact(contactId);

    if (!delContact) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: null,
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, `Failed to delete contact: ${error.message}`));
  }
};
