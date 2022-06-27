const express = require("express");
const shortid = require("shortid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({
    status: "Successful",
    data: data,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const item = await getContactById(contactId);
  if (item.length === 0) {
    res.status(404).json({
      status: "Error",
      message: `Contact with ${contactId} does not exist`,
    });
  }
  res.status(200).json({
    status: "Successful",
    data: item,
  });
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      status: "Error",
      message: validation.error.details[0].message,
    });
  }
  const { name, email, phone } = req.body;
  const newItem = {
    id: shortid(),
    name: name,
    email: email,
    phone: phone,
  };
  await addContact(newItem);
  res.status(201).json({
    status: "Successfully added",
    item: newItem,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  if (!removedContact) {
    res.status(404).json({
      status: "Error",
      message: `Contact with id:${contactId} does not exist`,
    });
  }
  res.status(200).json({
    status: "Successful",
    message: `Contact deleted`,
    removedContact: removedContact,
  });
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      status: "Error",
      message: validation.error.details[0].message,
    });
  }
  const { contactId } = req.params;
  const updateditem = await updateContact(contactId, req.body);
  if (!updateditem) {
    res.status(404).json({
      status: "Error",
      message: `Contact with id:${contactId} does not exist`,
    });
  }
  res.status(200).json({
    status: "Successfully updated",
    updateditem: updateditem,
  });
});

module.exports = router;
