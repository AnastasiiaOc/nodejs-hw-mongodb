
import { getContacts, getContactsById, createContact, patchContact, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePlaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import createHttpError from "http-errors";
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

  
export const getContactsController = async (req, resp) => {
  
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query)
    
    const userId = req.user._id; //(we get userId from token)
    if (!userId) {
        throw createHttpError(
        401, "Unauthorized"
    )}

    const data = await getContacts({ userId, page, perPage, sortBy, sortOrder } );
        resp.json({
            status: 200,
            message: "Contacts are successfully found",
            data,
        });
};

export const getContactsByIdController = async (req, resp, next) => {
    const { id } = req.params;
    const data = await getContactsById(id, req.user._id);
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
    
        const data = await createContact({ ...req.body, userId: req.user._id });
        if (req.file) {
            if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
              data.photo = await saveFileToCloudinary(req.file);
            } else {
             data.photo = await saveFileToUploadDir(req.file);
            }
          }
        
        resp.status(201).json({
            status: 201,
            message: "Successfully created a contact!",
            data,
        })
    };

export const patchContactsController = async (req, resp, next) => {
    // PATCH
    const { id } = req.params;
    const photo = req.file;

    if (photo)  {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            //   photoUrl = await saveFileToCloudinary(photo);
            req.body.photo = await saveFileToCloudinary(photo);
        } else {
          req.body.photo = await saveFileToUploadDir(photo);
        }
    }
 
    const result = await patchContact(id, req.body, {
        userId: req.user._id,
    });
    
    // console.log("result:", result)
    //   console.log("result:", result.data)
    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    resp.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result
    })
}

export const deleteContactController = async (req, resp) => {
    const { id } = req.params;
    const data = await deleteContact(id, req.user._id);
    if (!data) {
        throw createHttpError(404, "Contact not found")
    }
    resp.status(204).send()
}


