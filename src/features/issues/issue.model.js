let issues = [];
let currentId = 1;

function createIssue(data) {
  const newIssue = {
    id: currentId++,
    title: data.title,
    status: data.status || 'open',
    priority: data.priority || 'medium',
    assignedTo: data.assignedTo || null
  };

  issues.push(newIssue);
  return newIssue;
}

function getIssues() {
  return issues;
}

function updateIssue(id, updates) {
  const index = issues.findIndex((issue) => issue.id === id);

  if (index === -1) {
    return null;
  }

  const existingIssue = issues[index];
  const updatedIssue = {
    ...existingIssue,
    ...updates
  };

  issues[index] = updatedIssue;

  return updatedIssue;
}

function getIssueById(id) {
  return issues.find((issue) => issue.id === id) || null;
}

module.exports = {
  createIssue,
  getIssues,
  updateIssue,
  getIssueById
};

