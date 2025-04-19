const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Stock = require('./stock');
const Company = require('./company');

const StockDetails = sequelize.define(
  'StockDetails',
  {
    stock_details_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Stock, key: 'stock_id' },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Company, key: 'company_id' },
    },
    eja: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    restock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sales_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    creation_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    damage_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'stock_details',
    timestamps: false,
  }
);

module.exports = StockDetails;