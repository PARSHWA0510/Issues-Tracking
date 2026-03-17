const {
  createIssueService,
  getIssuesService,
  updateIssueService
} = require('./issue.service');
const { successResponse } = require('../../common/utils/responseHandler');

async function createIssueController(req, res, next) {
  try {
    const newIssue = await createIssueService(req.body);
    return successResponse(res, newIssue, 'Issue created successfully');
  } catch (err) {
    return next(err);
  }
}

async function getIssuesController(req, res, next) {
  try {
    const issues = await getIssuesService();
    return successResponse(res, issues, 'Issues fetched successfully');
  } catch (err) {
    return next(err);
  }
}

async function updateIssueController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedIssue = await updateIssueService(id, req.body);
    return successResponse(res, updatedIssue, 'Issue updated successfully');
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createIssueController,
  getIssuesController,
  updateIssueController
};

