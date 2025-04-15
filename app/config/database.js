const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false,
//   }
// );

console.log('DB_NAME:', process.env.DB_NAME); // should not be empty
console.log('DB_USER:', process.env.DB_USER); // should not be empty
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // should not be empty
console.log('DB_HOST:', process.env.DB_HOST); // should not be empty
console.log('DB_PORT:', process.env.DB_PORT); // should not be empty

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // set to true if you want to see raw SQL logs
  }
);

module.exports = sequelize;