const authRouter = require('./routes/auth');
const usersRouter = require('./routes/tutorial.routes');
const companyRouter = require('./routes/company.routes');
const concernPersonRouter = require('./routes/concernPerson.routes');

const registerRoutes = (app) => {
  app.use('/api/authentication', authRouter)
  app.use('/api/company', companyRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/ConcernPerson', concernPersonRouter);
};

module.exports = { registerRoutes };