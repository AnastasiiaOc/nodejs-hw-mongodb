import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsByIdController, getContactsController, createContactsController, deleteContactController, patchContactsController } from "../controllers/contacts.js";

import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";

import { updateContactScheme, contactScheme } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));
contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post("/", validateBody(contactScheme), ctrlWrapper(createContactsController));
contactsRouter.patch("/:id",isValidId, validateBody(updateContactScheme), ctrlWrapper(patchContactsController));
contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController))

export default contactsRouter;

