/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("locations").del();
  await knex("locations").insert([
    {
      id: 1,
      location_name: "Lambeth",
      contact: "Olivia",
      number: "+44 ...",
    },
    {
      id: 2,
      location_name: "Wandsworth",
      contact: "Simone",
      number: "+44 ...",
    },
    {
      id: 3,
      location_name: "Battersea",
      contact: "Tomika",
      number: "+44 ...",
    },
    {
      id: 4,
      location_name: "Croydon",
      contact: "Shanett",
      number: "+44 ...",
    },
  ]);
};
