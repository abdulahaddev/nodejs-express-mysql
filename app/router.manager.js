const usersRouter = require('./routes/tutorial.routes');
const companyRouter = require('./routes/company.routes');

const registerRoutes = (app) => {
  app.use('/api/company', companyRouter);
  app.use('/api/users', usersRouter);
};

module.exports = { registerRoutes };