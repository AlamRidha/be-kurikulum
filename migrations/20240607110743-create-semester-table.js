"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "semester",
      {
        idSemester: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        namaSemester: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        idFase: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "fase",
            },
            key: "idFase",
          },
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("semester");
  },
};
