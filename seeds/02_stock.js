/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("stock").del();
  await knex("stock").insert([
    {
      id: 1,
      location_id: "1",
      item_name: "Socks",
      quantity: 82,
      description: "Black pair of socks.",
    },
    {
      id: 2,
      location_id: "1",
      item_name: "Child Socks",
      quantity: 101,
      description: "Black pair of socks.",
    },
    {
      id: 3,
      location_id: "1",
      item_name: "Gloves",
      quantity: 34,
      description: "Black pair of gloves.",
    },
    {
      id: 4,
      location_id: "1",
      item_name: "Child Gloves",
      quantity: 40,
      description: "Black pair of gloves.",
    },
    {
      id: 5,
      location_id: "1",
      item_name: "T-shirt",
      quantity: 0,
      description: "Plain white T-shirt.",
    },
    {
      id: 6,
      location_id: "1",
      item_name: "Wooly hat",
      quantity: 13,
      description: "black childrens Wooly hat.",
    },
    {
      id: 7,
      location_id: "2",
      item_name: "Book",
      quantity: 34,
      description: "Under 11s childrens books.",
    },
    {
      id: 8,
      location_id: "2",
      item_name: "Toy",
      quantity: 21,
      description: "Young childrens toy.",
    },
    {
      id: 9,
      location_id: "2",
      item_name: "Slippers",
      quantity: 29,
      description: "Plain black slippers.",
    },
    {
      id: 10,
      location_id: "2",
      item_name: "Shower Gel",
      quantity: 157,
      description: "500ml Shower Gel bottle.",
    },
    {
      id: 11,
      location_id: "2",
      item_name: "Jacket",
      quantity: 8,
      description: "Plain black adult sized jacket.",
    },
    {
      id: 12,
      location_id: "2",
      item_name: "Cereal",
      quantity: 54,
      description: "Box of cereal.",
    },
    {
      id: 13,
      location_id: "2",
      item_name: "Canned Vegetables",
      quantity: 73,
      description: "Can of asorted vegetables.",
    },
    {
      id: 14,
      location_id: "3",
      item_name: "Antiperspirant",
      quantity: 28,
      description: "can of antiperspirant, 150ml.",
    },
    {
      id: 15,
      location_id: "3",
      item_name: "Cooking oil",
      quantity: 22,
      description: "5L Sunflower cooking oil",
    },
    {
      id: 16,
      location_id: "3",
      item_name: "Rice",
      quantity: 41,
      description: "10kg bag of rice",
    },
    {
      id: 17,
      location_id: "3",
      item_name: "flour",
      quantity: 63,
      description: "1kg plain flour",
    },
    {
      id: 18,
      location_id: "3",
      item_name: "sugar",
      quantity: 85,
      description: "1kg sugar",
    },
    {
      id: 19,
      location_id: "4",
      item_name: "Washing machine",
      quantity: 2,
      description: "7kg washing machine",
    },
    {
      id: 20,
      location_id: "4",
      item_name: "Fridge",
      quantity: 0,
      description: "Free standing fridge",
    },
  ]);
};
