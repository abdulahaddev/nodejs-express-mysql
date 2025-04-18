const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserRole = require('../models/user_role');

const login = async (user_name, password) => {
  try {
    // Find user
    const user = await User.findOne({
      where: { user_name, is_deleted: 0, user_status: 1 },
    });
    if (!user) {
      return {
        Status: 'Failed',
        StatusCode: 401,
        Message: 'Invalid username or password',
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        Status: 'Failed',
        StatusCode: 401,
        Message: 'Invalid username or password',
      };
    }

    // Get user roles
    const roles = await UserRole.findAll({
      where: { user_id: user.user_id },
      attributes: ['role_id'],
    });
    const roleIds = roles.map((role) => role.role_id);

    // Generate JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_name: user.user_name,
        roles: roleIds,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      Status: 'Success',
      StatusCode: 200,
      Data: {
        token,
        user: {
          user_id: user.user_id,
          user_name: user.user_name,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      },
    };
  } catch (error) {
    return {
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    };
  }
};

const signup = async (userData) => {
  try {
    const { user_name, password, first_name, last_name } = userData;

    // Check if user_name already exists
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
      return {
        Status: 'Failed',
        StatusCode: 400,
        Message: 'Username already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      user_name,
      first_name,
      last_name,
      password: hashedPassword,
      user_status: 0,
      is_deleted: 0,
    });

    return {
      Status: 'Success',
      StatusCode: 201,
      Data: {
        user_id: user.user_id,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  } catch (error) {
    return {
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    };
  }
};

module.exports = { login, signup };