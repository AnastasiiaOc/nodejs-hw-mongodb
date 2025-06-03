
import { getContacts, getContactsById, createContact, patchContact, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePlaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import createHttpError from "http-errors";

  
export const getContactsController = async (req, resp) => {  
    // const paginationParams = parsePaginationParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query)

    const data = await getContacts({ page, perPage, sortBy, sortOrder } );
        resp.json({
            status: 200,
            message: "Contacts are successfully found",
            data,
        }); 
};

export const getContactsByIdController = async (req, resp, next) => {
    const { id } = req.params;
    const data = await getContactsById(id);
    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };
    resp.json({
        status: 200,
        message: "The contact is successfully found",
        data,
    });
}

export const createContactsController = async (req, resp, next) => {
//POST add
    const data = await createContact(req.body);
    resp.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}
export const patchContactsController = async (req, resp, next) => {
    // PATCH
    const { id } = req.params;
    const result = await patchContact(id, req.body);

    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    resp.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data
    })
}
    
export const deleteContactController = async (req, resp) => {
    const { id } = req.params;
    const data = await deleteContact(id);
    if (!data) {
        throw createHttpError(404, "Contact not found")
    }
    resp.status(204).send()
}

// ===========================================

//   export const createContactController = async (req, res) => {
//     const contact = await createContact(req.body);
//     res.status(201).json({
//       status: 201,
//       message: 'Successfully created a contact !',
//       data: contact,
//     });
//   };
  
//   export const patchContactController = async (req, res, next) => {
//     const { contactId } = req.params;
//     const result = await updateContact(contactId, req.body);
//     if (!result) {
//       next(createHttpError(404, 'Contact not found'));
//       return;
//     }
//     res.json({
//       status: 200,
//       message: 'Successfully patched a contact!',
//       data: result.student,
//     });
//   };
  
//   export const deleteContactController = async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await deleteContact(contactId);
//     if (!contact) {
//       next(createHttpError(404, 'Contact not found'));
//       return;
//     }
//     res.status(204).send();
//   };