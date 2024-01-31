const knex = require("knex")(require("../knexfile"));
const { validateEmail } = require("../utils/validation-helpers");

const validateLocationId = async (req, res, next) => {
  const { warehouseId: id } = req.params;
  const warehouse = await knex("warehouses").where({ id }).first();

  if (!warehouse) {
    return res.status(404).json({ message: `Warehouse ID ${id} not found.` });
  }

  next();
};

const validateLocationBody = (req, res, next) => {
  const {
    location_name,
    address,
    city,
    country,
    contact_name,
    contact_phone,
    contact_email,
  } = req.body;

  // Check all required fields
  if (
    !location_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({
      message:
        "Request body must include a warehouse_name, address, city, country, contact_name, contact_position, contact_phone, and contact_email.",
    });
  }

  // Validate email and phone number
  if (!validateEmail(contact_email)) {
    return res.status(400).json({
      message: "contact_email must be a valid email.",
    });
  }
  if (!validatePhoneNum(contact_phone)) {
    return res.status(400).json({
      message: "contact_phone must be a valid phone number.",
    });
  }

  req.body = {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  };
  next();
};

// Inventory Middleware

const validateStockId = async (req, res, next) => {
  const { stockId: id } = req.params;
  const inventory = await knex("inventories").where({ id }).first();

  if (!inventory) {
    return res.status(404).json({ message: `Inventory ID ${id} not found.` });
  }

  next();
};

const validateItemBody = async (req, res, next) => {
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  // checking the value of quantity is a number

  if (isNaN(warehouse_id)) {
    return res.status(400).json({
      message: "A number must be provided for warehouse_id",
    });
  }
  if (isNaN(quantity)) {
    return res.status(400).json({
      message: "A number must be provided for quantity",
    });
  }
  if (!item_name || !description || !category || !status) {
    return res.status(404).json({
      message:
        "Request body must include a warehouse_id, item_name, description, category, status, quantity",
    });
  }

  const warehouse = await knex("warehouses")
    .where({ id: warehouse_id })
    .first();

  if (!warehouse) {
    return res
      .status(404)
      .json({ message: `Warehouse ID ${warehouse_id} not found.` });
  }

  req.body = {
    warehouse_id,
    item_name,
    description,
    category,
    status,
    quantity,
  };
  next();
};

module.exports = {
  validateLocationBody,
  validateLocationId,
  validateStockId,
  validateItemBody,
};
