const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContactById,
} = require("../services/apiService");

const getContactsController = async (req, res) => {
  const data = await getContacts();
  res.status(200).json({
    status: "Successful",
    contacts: data,
  });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const item = await getContactById(contactId);
    if (!item) {
      res.status(404).json({
        status: "Error",
        message: `Contact with ${contactId} does not exist`,
      });
    }
    res.status(200).json({
      status: "Successful",
      contact: item,
    });
  } catch (error) {
    if (error) {
      res.status(404).json({
        status: "Error",
        message: `Contact with ${contactId} does not exist`,
      });
    }
  }
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const removedContact = await deleteContactById(contactId);
    res.status(200).json({
      status: "Successful",
      message: `Contact deleted`,
      removedContact: removedContact,
    });
  } catch (error) {
    if (error) {
      res.status(404).json({
        status: "Error",
        message: `Contact with id:${contactId} does not exist`,
      });
    }
  }
};

const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);

  res.status(201).json({
    status: "Successfully added",
    contact: newContact,
  });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    await updateContactById(contactId, req.body);
    const updatedContact = await getContactById(contactId);
    res.status(200).json({
      status: "Successfully updated",
      updatedContact: updatedContact,
    });
  } catch (error) {
    if (error) {
      res.status(404).json({
        status: "Error",
        message: `Contact with id:${contactId} does not exist`,
      });
    }
  }
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    await updateStatusContactById(contactId, req.body);
    const updatedContact = await getContactById(contactId);
    res.status(200).json({
      status: "Successfully updated",
      updatedContact: updatedContact,
    });
  } catch (error) {
    if (error) {
      res.status(404).json({
        status: "Error",
        message: `Contact with id:${contactId} does not exist`,
      });
    }
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
