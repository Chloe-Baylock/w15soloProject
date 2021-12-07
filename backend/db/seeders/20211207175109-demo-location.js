'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Locations', [{
      userId: '1',
      location: 'USAnjPlace',
      locationName: 'a nice home',
      description: 'I live here with my numerous friends'
    },
    {
      userId: '1',
      location: 'USAcaliforniaArea',
      locationName: 'California house',
      description: 'A lot of bread is made here'
    },
    {
      userId: '3',
      location: 'XXASJZL',
      locationName: 'fake place fake bread',
      description: 'We invite you to stay here.'
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
    return queryInterface.bulkDelete('Locations', {
      location: { [Op.in]: ['USAnjPlace', 'USAcaliforniaArea', 'XXASJZL'] }
    }, {});
  }
};
