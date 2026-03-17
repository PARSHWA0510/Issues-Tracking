const Joi = require('joi');
const { httpError } = require('../../common/utils/httpError');

function validateBody(schema) {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return next(httpError(400, message));
    }

    req.body = value;
    return next();
  };
}

function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return next(httpError(400, message));
    }

    req.params = value;
    return next();
  };
}

const createIssueSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  status: Joi.string().valid('open', 'in-progress', 'closed').default('open'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  assignedTo: Joi.string().trim().allow(null, '')
});

const updateIssueSchema = Joi.object({
  title: Joi.string().trim().min(1),
  status: Joi.string().valid('open', 'in-progress', 'closed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  assignedTo: Joi.string().trim().allow(null, '')
}).min(1);

const issueIdParamsSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

function validateCreateIssue(req, res, next) {
  return validateBody(createIssueSchema)(req, res, next);
}

function validateUpdateIssueBody(req, res, next) {
  return validateBody(updateIssueSchema)(req, res, next);
}

function validateIssueIdParam(req, res, next) {
  return validateParams(issueIdParamsSchema)(req, res, next);
}

module.exports = {
  validateCreateIssue,
  validateUpdateIssueBody,
  validateIssueIdParam
};

