import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const writeContacts = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const [deleted] = allContacts.splice(index, 1);
  await writeContacts(allContacts);
  return deleted;
}

export async function addContact(data) {
  // Повертає об'єкт доданого контакту (з id).
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await writeContacts(allContacts);
  return newContact;
}

export async function updateContact(contactId, data) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  allContacts[index] = { ...allContacts[index], ...data };
  await writeContacts(allContacts);

  return allContacts[index];
}
