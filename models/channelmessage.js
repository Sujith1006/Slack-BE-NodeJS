'use strict';
module.exports = (sequelize, DataTypes) => {
  const channelmessage = sequelize.define('channelmessage', {
    messages: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  channelmessage.associate = function(models) {
    // associations can be defined here
    channelmessage.belongsTo(models.userdetails ,{as:'user'})
    channelmessage.belongsTo(models.channellist ,{as:'channel'})


  };
  return channelmessage;
};