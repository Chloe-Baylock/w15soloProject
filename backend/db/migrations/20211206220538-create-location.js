'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
      allowNull: false,
      type: Sequelize.INTEGER
      },
      location: {
      allowNull: false,
      type: Sequelize.STRING(500)
      },
      locationName: {
      allowNull: false,
      type: Sequelize.STRING(500)
      },
      description: {
      allowNull: false,
      type: Sequelize.STRING(2000)
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING(500)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};