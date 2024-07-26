import { ContactsCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
    try {
        return await ContactsCollection.find();
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
        const contact = await ContactsCollection.create(payload);
        return contact;
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
            });

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
