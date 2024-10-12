// // Function to create the database
// import { Sequelize } from 'sequelize';
// import { config } from 'dotenv';
// config();
//
// async function createDatabase(databaseName: string) {
//   // Connect to MySQL without specifying a database
//   const tempSequelize = new Sequelize(
//     `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`,
//     {
//       dialect: 'mysql',
//     }
//   );
//
//   try {
//     // Use queryInterface to create the database
//     await tempSequelize.getQueryInterface().createDatabase(databaseName);
//     console.log(`Database ${databaseName} created successfully.`);
//   } catch (error) {
//     console.error('Unable to create database:', error);
//   } finally {
//     await tempSequelize.close();
//   }
// }
//
// export { createDatabase };
