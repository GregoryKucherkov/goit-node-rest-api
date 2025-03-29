import HttpError from "../helpers/HttpError";

export const validateBody = (contactSchema) => {
  const func = (req, _, next) => {
    const { error } = contactSchema.validate(req.body);
  };
};
