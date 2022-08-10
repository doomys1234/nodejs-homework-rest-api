const mongoose = require("mongoose");
const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set name for contact"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Set name for contact"],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("Contact", contactsSchema);

module.exports = { Contacts };
