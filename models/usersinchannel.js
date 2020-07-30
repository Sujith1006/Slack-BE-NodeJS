'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersinchannel = sequelize.define('usersinchannel', {
    dummy: DataTypes.INTEGER
  }, {});
  usersinchannel.associate = function(models) {
    // associations can be defined here
    usersinchannel.belongsTo(models.userdetails,{as:'user'})
    usersinchannel.belongsTo(models.channellist,{as:'channel'})
    usersinchannel.belongsTo(models.roletable,{as:"role"})

  };
  return usersinchannel;
};