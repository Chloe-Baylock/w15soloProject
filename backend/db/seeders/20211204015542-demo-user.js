'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [{
      email: 'demo@email.com',
      username: 'nodemo',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: faker.internet.email(),
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    },
    {
      email: faker.internet.email(),
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['nodemo', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
