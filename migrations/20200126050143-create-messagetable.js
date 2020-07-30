'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messagetables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    
      messages: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      messagecount:{
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleteindex:{
        type:Sequelize.ARRAY(Sequelize.INTEGER)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messagetables');
  }
};