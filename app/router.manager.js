const authRouter = require('./routes/auth');
const usersRouter = require('./routes/tutorial.routes');
const companyRouter = require('./routes/company.routes');

const registerRoutes = (app) => {
  app.use('/api/authentication', authRouter)
  app.use('/api/company', companyRouter);
  app.use('/api/users', usersRouter);
};

module.exports = { registerRoutes };