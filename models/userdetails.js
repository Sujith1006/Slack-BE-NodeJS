'use strict';
module.exports = (sequelize, DataTypes) => {
  const userdetails = sequelize.define('userdetails', {
    username: DataTypes.STRING,
  
    password: DataTypes.STRING
  }, {});
  userdetails.associate = function(models) {
    userdetails.belongsTo(models.roletable)
    // associations can be defined here
    // userdetails.hasMany(models.messagetable,{as:'senderId'});
    // userdetails.hasMany(models.messagetable,{as:'recieverId'});
    userdetails.hasMany(models.channellist,{foreignKey : 'creatorId'})
    // userdetails.hasMany(models.usersinchannel,{as:"user"})
    userdetails.hasMany(models.usersinchannel,{foreignKey:"userId"})

  };
  return userdetails;
};