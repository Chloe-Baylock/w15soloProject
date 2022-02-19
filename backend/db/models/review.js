'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    reviewContent: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Review;
};