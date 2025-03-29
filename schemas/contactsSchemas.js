import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .max(30)
    .required(),
  phone: Joi.string().min(7).max(15).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .min(3)
    .max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .max(30),
  phone: Joi.string().min(7).max(15),
})
  .min(1)
  .messages({
    "object.min": "At least one field (name, email, or phone) must be provided",
  });
