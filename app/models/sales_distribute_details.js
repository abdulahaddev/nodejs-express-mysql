const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const SalesDistribute = require('./sales_distribute');

const SalesDistributeDetails = sequelize.define(
  "SalesDistributeDetails",
  {
    salesDistributeDetailsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    salesDistributeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: SalesDistribute, key: 'salesDistributeId' },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    receiveQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    returnQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salesQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSalesPrice: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    creationTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    damageQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "sales_distribute_details",
    timestamps: false,
  }
);
module.exports = SalesDistributeDetails;
