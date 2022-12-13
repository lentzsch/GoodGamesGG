'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      options.tableName = "Consoles";
      return queryInterface.bulkInsert(options, [
        { name: 'Playstation 4', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Xbox One', createdAt: new Date(), updatedAt: new Date()},
        { name: 'PC', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Nintendo Switch', createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      options.tableName = "Consoles";
      return queryInterface.bulkDelete(options, null, {});
  }
};
