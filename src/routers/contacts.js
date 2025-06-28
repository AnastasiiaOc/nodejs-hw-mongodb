import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsByIdController, getContactsController, createContactsController, deleteContactController, patchContactsController } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { updateContactScheme, contactScheme } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter.get("/", ctrlWrapper(getContactsController));
contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post("/", validateBody(contactScheme), ctrlWrapper(createContactsController));
contactsRouter.patch("/:id",isValidId, validateBody(updateContactScheme), ctrlWrapper(patchContactsController));
contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));



export default contactsRouter;

// 💡 Зверніть увагу! Коли ми приміняємо middleware таким чином (router.use(authenticate);), як вказано вище, вона будет примінятися до всіх роутів цього роутера. Тобто, вона відпрацює на всіх роутах, що починаються зі /contacts

         
// router.put(
//   '/:studentId',
//   isValidId, 
//   validateBody(createStudentSchema),
//   ctrlWrapper(upsertStudentController),
// );
