// import { getContactsById, getContacts } from
// import { getContacts, getContactsById, createContact, patchContact, deleteContact } from "../services/contacts.js";
import { getContacts, getContactsById} from "../services/contacts.js";
import createHttpError from "http-errors";

// винесіть код контролерів з файлу src/server.js до файлу src/controllers/contacts.js
    
export const getContactsController = async (req, resp, next) => {   //+
    const data = await getContacts();
    // app.get("/contacts", async (req, resp) => {
    //     const data = await getContacts();
        resp.json({
            status: 200,
            message: "Contacts are successfully found",
            data,
        }); 
};


export const getContactsByIdController = async (req, resp, next) => {

    // app.get("/contacts/:id", async(req, resp) => {
    const { id } = req.params;
    const data = await getContactsById(id);
    if (!data) {
        // return resp.status(404).json({
        //     status: 404,
        //     message:`The contact with id =${id} is not found`
        throw createHttpError(404, 'Contact not found');
    };
    resp.json({
        status: 200,
        message: "The movie is successfully found",
        data,
    });
}



// export const createContactsController = async (req, resp, next) => {
//     //POST add
//     const data = await createContact(req.body);

//     resp.status(201).json({
//         status: 201,
//         message: "Successfully created a contact!",
//         data,
//     })
// }
// export const patchContactsController = async (req, resp, next) => {
//     // PATCH
//     const data = await patchContact(id, req.body);

//     if (!data) {
//         next(createHttpError(404, "Contact not found"));
//         return;
//     }

//     resp.status(201).json({
//         status: 200,
//         message: "Successfully patched a contact!",
//         data,
//     })
// }
    
// export const deleteContactController = async (req, resp) => {
//     const { id } = req.params;
//     const data = await deleteContact(id);

//     if (!data) {
//         throw createHttpError(404, "Contact not found")
//     }
//     resp.status(204).send()
// }

// ====================================Boys======================================
// import {
//     getAllContacts,
//     getContactById,
//     createContact,
//     deleteContact,
//     updateContact,
//   } from '../services/contacts.js';
//   import createHttpError from 'http-errors';
  
//   export const getAllContactsController = async (req, res, next) => {
//     const contacts = await getAllContacts();
  
//     res.json({
//       status: 200,
//       message: 'Successfully found contacts',
//       data: contacts,
//     });
//   };
  
//   export const getContactByIdController = async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId);
//     if (!contact) {
//       throw createHttpError(404, 'Contact not found');
//     }
  
//     res.json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   };
  
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