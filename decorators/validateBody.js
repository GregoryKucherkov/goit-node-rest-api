import HttpError from "../helpers/HttpError.js";

export const validateBody = (contactSchema) => {
  const func = (req, _, next) => {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(
        HttpError(400, error.details.map((detail) => detail.message).join(", "))
      );
    }
    next();
  };
  return func;
};
