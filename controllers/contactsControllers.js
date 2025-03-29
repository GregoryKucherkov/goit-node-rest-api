import * as contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

import { ctrlWrapper } from "../decorators/ctrlWrapper.js";

export const getAllContacts = ctrlWrapper(async (req, res, next) => {
  const allContacts = await contactsService.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: allContacts,
  });
});

export const getOneContact = ctrlWrapper(async (req, res, next) => {
  const contact = await contactsService.getContactById(req.params.id);
  if (!contact) {
    throw HttpError(404, "Contact was not found!");
  }
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
});

export const deleteContact = ctrlWrapper(async (req, res, next) => {
  const contatToDelete = await contactsService.removeContact(req.params.id);
  if (!contatToDelete) {
    throw HttpError(404, "Contact was not found!");
  }
  res.json({
    status: "deleted",
    code: 200,
    data: contatToDelete,
  });
});

export const createContact = ctrlWrapper(async (req, res, next) => {
  const { error, value } = createContactSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(", ");
    throw HttpError(400, messages); // Send validation error message
  }

  const contact = await contactsService.addContact(value);
  res.json({
    status: "success",
    code: 201,
    data: contact,
  });
});

export const updateContact = ctrlWrapper(async (req, res, next) => {
  const { error, value } = updateContactSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(", ");
    throw HttpError(400, messages); // Send validation error message
  }

  const contact = await contactsService.updateContact(req.params.id, value);
  if (!contact) {
    throw HttpError(404, "Contact was not found!");
  }

  res.json({
    status: "success",
    code: 201,
    data: contact,
  });
});
