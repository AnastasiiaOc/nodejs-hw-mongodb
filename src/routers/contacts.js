import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsByIdController, getContactsController, createContactsController, deleteContactController, patchContactsController } from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));
contactsRouter.get("/:id", ctrlWrapper(getContactsByIdController));
contactsRouter.post("/", ctrlWrapper(createContactsController));
contactsRouter.patch("/:id", ctrlWrapper(patchContactsController));
contactsRouter.delete("/:id", ctrlWrapper(deleteContactController))

export default contactsRouter;

