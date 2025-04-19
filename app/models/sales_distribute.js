const sequelize = require("../config/database");
const { DataTypes } = require('sequelize');
const Company = require('./company');
const ConcernPerson = require('./concern_person');

const SalesDistribute = sequelize.define(
  "SalesDistribute",
  {
    salesDistributeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    totalReceive: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalReturn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grandTotal: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    concernPersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: ConcernPerson, key: 'concernPersonId' },
    },
    creationTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Company, key: 'company_id' },
    },
    damageAmount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    srcommission: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    dsrcommission: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
  },
  {
    tableName: "sales_distribute",
    timestamps: false,
  }
);
module.exports = SalesDistribute;
