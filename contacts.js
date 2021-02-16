const path = require('path');
const fs = require('fs/promises');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

// TODO: задокументировать каждую функцию
async function getContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contactsList);
  } catch (error) {
    return console.error(error.message);
  }
}

async function listContacts() {
  try {
    const allContacts = await getContacts();
    console.log('Contacts list: ');
    console.table(allContacts);
    return allContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await getContacts();
    const contact = allContacts.find(({ id }) => id === contactId);

    console.log(`Contact with id ${contactId}: `);
    console.table(contact);

    return contact;
  } catch (error) {
    return console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await getContacts();
    const newAllContacts = allContacts.filter(({ id }) => id !== contactId);

    if (allContacts.length === newAllContacts.length) {
      return console.error(`Contact with id ${contactId} does not exist`);
    }

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newAllContacts, null, 2, 'utf8'),
    );

    console.log(`Contact with id ${contactId} have been deleted `);
    console.table(newAllContacts);

    return newAllContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await getContacts();
    const newContact = { id: shortid.generate(), name, email, phone };
    const newAllContacts = [...allContacts, newContact];

    console.table('New contact added ');
    console.table(newContact);

    return newAllContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
