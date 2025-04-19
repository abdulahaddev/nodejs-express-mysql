const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/signIn', async (req, res) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    return res.status(400).json({
      Status: 'Failed',
      StatusCode: 400,
      Message: 'Username and password are required',
    });
  }

  const result = await authService.login(user_name, password);
  res.status(result.StatusCode).json(result);
});

router.post('/signup', async (req, res) => {
  const { user_name, password, first_name, last_name } = req.body;
  if (!user_name || !password) {
    return res.status(400).json({
      Status: 'Failed',
      StatusCode: 400,
      Message: 'Username and password are required',
    });
  }

  const result = await authService.signup({
    user_name,
    password,
    first_name,
    last_name
  });
  res.status(result.StatusCode).json(result);
});

module.exports = router;