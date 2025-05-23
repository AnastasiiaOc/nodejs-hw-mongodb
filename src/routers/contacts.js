import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// import { getContactsByIdController, getContactsController, createContactsController, deleteContactController, patchContactsController } from "../controllers/contacts.js";
import { getContactsByIdController, getContactsController} from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));
contactsRouter.get("/:id", ctrlWrapper(getContactsByIdController));
// contactsRouter.post("/contacts", ctrlWrapper(createContactsController));
// contactsRouter.patch("/contacts/:id", ctrlWrapper(patchContactsController));
// contactsRouter.delete("/contacts/:id", ctrlWrapper(deleteContactController))

export default contactsRouter;

