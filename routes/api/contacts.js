const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const {addPostValidation,addStatusValidation} = require("../../middlewares/joiMiddleware");
const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addPostValidation,asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put("/:contactId", asyncWrapper(updateContactController));

router.patch("/:contactId/favorite", addStatusValidation, asyncWrapper(updateStatusContactController));

module.exports = router;
