const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const response = await knex("locations").select(
      "id",
      "location_name",
      "contact",
      "number"
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to retrieve location data.", error });
  }
};

const createNew = async (req, res) => {
  try {
    const newWarehouseIds = await knex("locations").insert(req.body);
    const createdWarehouse = await knex("locations")
      .where({ id: newWarehouseIds[0] })
      .first()
      .select("id", "location_name", "contact", "number");
    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new location.`,
      error,
    });
  }
};
const findLocation = async (req, res) => {
  const { locationId: id } = req.params;
  try {
    const data = await knex("locations")
      .where({ id: id })
      .first()
      .select("id", "location_name", "contact", "number");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error });
  }
};
const edit = async (req, res) => {
  const { locationId: id } = req.params;
  try {
    await knex("locations").where({ id }).update(req.body);

    const updatedLocation = await knex("Locations")
      .where({ id })
      .first()
      .select("id", "location_name", "contact", "number");

    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update location with ID ${id}`,
      error,
    });
  }
};

const stock = async (req, res) => {
  try {
    const items = await knex("locations")
      .join("stock", "stock.location_id", "location.id")
      .where({ location_id: req.params.locationId })
      .select("stock.id", "item_name", "quantity", "description");

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve stock items for location ID ${req.params.locationId}`,
    });
  }
};

const remove = async (req, res) => {
  const { locationId: id } = req.params;
  try {
    await knex("locations").where({ id }).delete();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Unable to delete location.", error });
  }
};

module.exports = { index, createNew, findLocation, edit, stock, remove };
