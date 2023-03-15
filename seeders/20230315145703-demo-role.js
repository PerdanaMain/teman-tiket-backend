"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        role_name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: "Users",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: "Partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
