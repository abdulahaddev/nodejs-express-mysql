const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const ConcernPerson = sequelize.define('ConcernPerson', {
  concern_person_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  concern_person_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'concern_person',
  timestamps: false, 
});

module.exports = ConcernPerson;