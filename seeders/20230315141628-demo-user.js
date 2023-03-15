"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        role_id: 1,
        first_name: "Super",
        last_name: "Admin",
        birthdate: new Date(),
        phone: "Admin",
        gender: "Admin",
        email: "admin",
        password: await bcrypt.hash("admin", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        first_name: "Firman",
        last_name: "Perdana",
        birthdate: new Date(),
        phone: "Admin",
        gender: "Admin",
        email: "firman.fp123@gmail.com",
        password: await bcrypt.hash("firman2307", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        first_name: "M",
        last_name: "Novianto",
        birthdate: new Date(),
        phone: "Admin",
        gender: "Admin",
        email: "mnoviantoanggoro@gmail.com",
        password: await bcrypt.hash("123456", 10),
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
