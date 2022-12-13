"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Libraries";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "John's Suggestions",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Managment Games",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Play with SO",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sims",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Party Games",
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Libraries";
    return queryInterface.bulkDelete(options, null, {});
  },
}
