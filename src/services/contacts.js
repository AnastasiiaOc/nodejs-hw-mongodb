import ContactCollection from "../db/models/Contact.js";
export const getContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactsById = async (id) => {
  const contact = await ContactCollection.findById(id);
  return contact;
};

export const createContact = payload => ContactCollection.create(payload); //POST

export const patchContact = async (_id, payload, options = {}) => {
  const rawResults = await ContactCollection.findByIdAndUpdate({_id}, payload, {
    // const rawResults = await ContactCollection.findOneAndUpdate({_id}, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResults || !rawResults.value) return null;
  return {
    data: rawResults.value,
    isNew:Boolean(rawResults?.lastErrorObject?.upserted),
    
  }
}

export const deleteContact = (_id) => ContactCollection.findByIdAndDelete({ _id })
