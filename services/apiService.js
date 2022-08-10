const { Contacts } = require("../db/contactsSchema");
const getContacts = async () => {
    const data = await Contacts.find({});
    return data
}
const getContactById = async (contactId) => {
    const data = await Contacts.findById(contactId);
    return data
}
const addContact = async (body) => {
    const { name, email, phone, favorite = false } = body;
  const newItem = {
    name: name,
    email: email,
    phone: phone,
    favorite: favorite,
  };
    const contact = new Contacts(newItem);
    await contact.save();
    return contact
}
const updateContactById = async (contactId, body) => {
    const { name, email, phone } = body;
    await Contacts.findByIdAndUpdate(contactId, {
      $set: { name, email, phone },
    });
    
}
const deleteContactById = async (contactId) => {
    const data = await Contacts.findByIdAndRemove(contactId);
    return data
}
const updateStatusContactById = async (contactId, body) => {
    const{favorite}= body
    await Contacts.findByIdAndUpdate(contactId, { $set: { favorite } });
    
}

module.exports = {
    getContacts,
    getContactById,addContact,updateContactById,deleteContactById,updateStatusContactById
}