'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 2000]
      }
    }
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, { foreignKey: 'userId' });

    Location.hasMany(models.Booking, { foreignKey: 'locationId' });
  };
  return Location;
};