const { createIssue, getIssues, updateIssue, getIssueById } = require('./issue.model');
const { httpError } = require('../../common/utils/httpError');

function createIssueService(payload) {
  const { title, priority, assignedTo, status } = payload || {};

  const existingIssues = getIssues();
  const normalizedTitle = title.toLowerCase();

  const duplicate = existingIssues.find(
    (issue) => issue.title.toLowerCase() === normalizedTitle
  );

  if (duplicate) {
    throw httpError(409, 'Issue with this title already exists');
  }

  const issueData = {
    title,
    priority,
    assignedTo,
    status
  };

  return createIssue(issueData);
}

function getIssuesService() {
  return getIssues();
}

function updateIssueService(idParam, payload) {
  const id = parseInt(idParam, 10);
  const allowedFields = ['title', 'status', 'priority', 'assignedTo'];
  const updates = {};

  for (const key of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      updates[key] = payload[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw httpError(400, 'No valid fields provided for update');
  }

  const existingIssue = getIssueById(id);

  if (!existingIssue) {
    throw httpError(404, 'Issue not found');
  }

  const hasActualChange = Object.entries(updates).some(
    ([key, value]) => existingIssue[key] !== value
  );

  if (!hasActualChange) {
    throw httpError(400, 'Issue already has the same values');
  }

  return updateIssue(id, updates);
}

module.exports = {
  createIssueService,
  getIssuesService,
  updateIssueService
};

