const express = require('express');
const issueRoutes = require('./features/issues/issue.routes');
const { errorHandler } = require('./common/middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/issues', issueRoutes);

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: 'Route not found'
  };
  next(error);
});

app.use(errorHandler);

module.exports = app;

