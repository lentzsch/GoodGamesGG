'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const models = require('../models')
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ratings = [
      { overall: 2, body: 'fdgd', userId: 1, gameId: 2, createdAt: new Date(), updatedAt: new Date(), },
      { overall: 5, body: 'dfgd', userId: 2, gameId: 1, createdAt: new Date(), updatedAt: new Date(), },
    ]

    const games = await models.Game.findAll();
    const users = await models.User.findAll();

    for (let i = 0; i < 200; i++) {
      const randGame = Math.floor(Math.random() * (games.length - 1) + 1);
      const randUser = Math.floor(Math.random() * (users.length - 1) + 1);
      const randOverall = Math.floor(Math.random() * (6-3) + 3);
      let newRating = {
        overall: randOverall,
        body: faker.lorem.paragraph(),
        userId: randUser,
        gameId: randGame,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      ratings.push(newRating);
    }

    options.tableName = "Ratings";
    return queryInterface.bulkInsert(options, ratings, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Ratings";
    return queryInterface.bulkDelete(options, null, {});
  }
};
