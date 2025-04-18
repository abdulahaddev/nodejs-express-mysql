const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');

const UserRole = sequelize.define(
  'UserRole',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Role,
        key: 'role_id',
      },
    },
  },
  {
    tableName: 'user_role',
    timestamps: false,
  }
);

// Define relationships
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });
User.hasMany(UserRole, { foreignKey: 'user_id' });
Role.hasMany(UserRole, { foreignKey: 'role_id' });

module.exports = UserRole;