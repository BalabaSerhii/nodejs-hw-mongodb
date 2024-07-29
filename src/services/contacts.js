import { ContactsCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }

    if (filter.isFavourite) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
      ContactsCollection.find().merge(contactsQuery).countDocuments(),

      contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);

    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );

    return {
      data: contacts,
      ...paginationData,
    };
  } catch (error) {
    throw new Error(`Failed to retrieve contacts: ${error.message}`);
  }
};

export const getContactById = async (contactId) => {
  try {
    return await ContactsCollection.findById(contactId);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return null;
    }
    throw new Error(`Failed to retrieve contact: ${error.message}`);
  }
};

export const createContact = async (payload) => {
  try {
    return await ContactsCollection.create(payload);
  } catch (error) {
    throw new Error(`Failed to create contact: ${error.message}`);
  }
};

export const patchContact = async (contactId, payload, options = {}) => {
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return null;
    }
    throw new Error(`Failed to update contact: ${error.message}`);
  }
};

export const deleteContact = async (contactId) => {
  try {
    return await ContactsCollection.findOneAndDelete({ _id: contactId });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return null;
    }
    throw new Error(`Failed to delete contact: ${error.message}`);
  }
};
