'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    timespan: DataTypes.STRING
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Booking;
};