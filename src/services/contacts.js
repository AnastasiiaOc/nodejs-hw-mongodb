import ContactCollection from "../db/models/Contact.js"; //OK
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

import { SORT_ORDER } from "../constants/index.js";

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();
  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
 
    
//   ======used to be==============================
//   const contacts = await ContactCollection.find();
//   return contacts;
// };


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


// ==========================================================================

// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactsQuery = ContactsCollection.find();
//   const contactsCount = await ContactsCollection.find()
//     .merge(contactsQuery)
//     .countDocuments();

//   const contacts = await contactsQuery
//     .skip(skip)
//     .limit(limit)
//     .sort({ [sortBy]: sortOrder })
//     .exec();

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = async (contactId) => {
//   const contact = await ContactsCollection.findById(contactId);
//   return contact;
// };

// export const createContact = async (payload) => {
//   const contact = await ContactsCollection.create(payload);
//   return contact;
// };

// export const updateContact = async (contactId, payload, options = {}) => {
//   const rawResult = await ContactsCollection.findOneAndUpdate(
//     {
//       _id: contactId,
//     },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!rawResult || !rawResult.value) return null;
//   return {
//     student: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };

// export const deleteContact = async (contactId) => {
//   const contact = await ContactsCollection.findOneAndDelete({
//     _id: contactId,
//   });
//   return contact;
// };