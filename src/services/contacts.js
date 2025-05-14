import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();
export const getContactsById = () => ContactCollection.findOne({_id:id})

// can be refactored