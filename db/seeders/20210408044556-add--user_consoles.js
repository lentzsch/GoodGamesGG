"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "User_consoles";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          consoleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "User_consoles";
    return queryInterface.bulkDelete(options, null, {});
  },
};
