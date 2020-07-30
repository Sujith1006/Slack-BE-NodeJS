'use strict';
module.exports = (sequelize, DataTypes) => {
  const messagetable = sequelize.define('messagetable', {
  
    messagecount:DataTypes.INTEGER,
    messages: DataTypes.ARRAY(DataTypes.STRING),
    deleteindex:DataTypes.ARRAY(DataTypes.INTEGER),
    bg_color: DataTypes.STRING
    
  }, {});
  messagetable.associate = function(models) {
    // associations can be defined here
    messagetable.belongsTo(models.userdetails ,{as:'sender'})
    messagetable.belongsTo(models.userdetails ,{as:'reciever'})


  };
  return messagetable;
};