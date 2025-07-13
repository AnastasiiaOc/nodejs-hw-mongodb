import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsByIdController, getContactsController, createContactsController, deleteContactController, patchContactsController } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { updateContactScheme, contactScheme } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/multer.js';


const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter.get("/", ctrlWrapper(getContactsController));
contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post("/", upload.single('photo'), validateBody(contactScheme), ctrlWrapper(createContactsController));
contactsRouter.patch("/:id", isValidId, upload.single('photo'), validateBody(updateContactScheme), ctrlWrapper(patchContactsController));
contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));



export default contactsRouter;


//OK