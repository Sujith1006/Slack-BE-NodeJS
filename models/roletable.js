'use strict';
module.exports = (sequelize, DataTypes) => {
  const roletable = sequelize.define('roletable', {
    roletype: DataTypes.STRING
  }, {});
  roletable.associate = function(models) {
    // associations can be defined here
  };
  return roletable;
};