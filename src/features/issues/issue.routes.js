const express = require('express');
const {
  createIssueController,
  getIssuesController,
  updateIssueController
} = require('./issue.controller');
const {
  validateCreateIssue,
  validateUpdateIssueBody,
  validateIssueIdParam
} = require('./issue.validation');

const router = express.Router();

router.post('/', validateCreateIssue, createIssueController);
router.get('/', getIssuesController);
router.patch('/:id', validateIssueIdParam, validateUpdateIssueBody, updateIssueController);

module.exports = router;

