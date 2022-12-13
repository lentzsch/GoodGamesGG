"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "My_games";
    return queryInterface.bulkInsert(
      options,
      [
        {
          played: 1,
          userId: 6,
          gameId: 24,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 27,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 26,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 31,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 0,
          userId: 6,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 1,
          userId: 6,
          gameId: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          played: 2,
          userId: 6,
          gameId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "My_games";
    return queryInterface.bulkDelete(options, null, {});
  },
}
