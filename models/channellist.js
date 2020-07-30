'use strict';
module.exports = (sequelize, DataTypes) => {
  const channellist = sequelize.define('channellist', {
    name: DataTypes.STRING
  }, {});
  channellist.associate = function(models) {
    // associations can be defined here
    channellist.belongsTo(models.userdetails,{as:"creator"})
    
  };
  return channellist;
};