const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.filter((item) => item.id === contactId);
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const itemIdx = data.findIndex((item) => item.id === contactId);
  if (itemIdx === -1) {
    return null;
  }
  const newData = data.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newData));
  return data[itemIdx];
};

const addContact = async (newItem) => {
  const data = await listContacts();
  const newData = [...data, newItem];

  fs.writeFile(contactsPath, JSON.stringify(newData));
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const itemIdx = data.findIndex((item) => item.id === contactId);
  if (itemIdx === -1) {
    return null;
  }
  const newData = data.map(function (item) {
    if (item.id === contactId) {
      item.name = body.name;
      item.email = body.email;
      item.phone = body.phone;
      return item;
    }
    return item;
  });
  fs.writeFile(contactsPath, JSON.stringify(newData));
  return newData[itemIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
