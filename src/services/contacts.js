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
        const contact = await ContactsCollection.findById(contactId);
        if (!contact) {
            throw new Error('Contact not found');
        }
        return contact;
    } catch (error) {
        throw new Error(`Failed to retrieve contact: ${error.message}`);
    }
};