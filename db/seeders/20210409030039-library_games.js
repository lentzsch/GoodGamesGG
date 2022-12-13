"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Library_games";
    return queryInterface.bulkInsert(
      options,
      [
        {
          gameId: 24,
          libraryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 27,
          libraryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 31,
          libraryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 25,
          libraryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 30,
          libraryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 26,
          libraryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 33,
          libraryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 3,
          libraryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 26,
          libraryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 21,
          libraryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 6,
          libraryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 9,
          libraryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 13,
          libraryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 2,
          libraryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 12,
          libraryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: 11,
          libraryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Library_games";
    return queryInterface.bulkDelete(options, null, {});
  },
};
