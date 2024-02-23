const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = joi => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.todoSchema = Joi.object({
  title: Joi.string().required().max(30).trim(),
  description: Joi.string().required(),
  completed: Joi.boolean().required(),
  author: Joi.string(), // Assuming author is a string (ID of the user)
});

// module.exports.userSchema = Joi.object({
//   email: Joi.string().required().email().escapeHTML(),
//   todos: Joi.array().items(Joi.string()),
// });
