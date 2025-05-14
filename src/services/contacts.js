import ContactCollection from "../db/models/Contact";

export const getContacts = () => ContactCollection.find();
export const getContactsById = () => ContactCollection.findOne({_id:id})

// can be refactored