const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const ConcernPerson = sequelize.define(
  "ConcernPerson",
  {
    concernPersonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    concernPersonName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "concern_person",
    timestamps: false,
  }
);

module.exports = ConcernPerson;