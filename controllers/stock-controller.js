const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("locations")
      .join("stock", "stock.locations_id", "locations.id")
      .select(
        "stock.id",
        "location_name",
        "item_name",
        "quantity",
        "description"
      );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve stock data.", error });
  }
};

const findItem = async (req, res) => {
  const { stockId: id } = req.params;
  try {
    const data = await knex("stock")
      .join("loocations", "locations.id", "stock.locations_id")
      .where({ "stock.id": id })
      .first()
      .select(
        "stock.id",
        "location_name",
        "locations_id",
        "item_name",
        "quantity",
        "description"
      );
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Unable to get stock item.", error });
  }
};

const newItem = async (req, res) => {
  try {
    const result = await knex("stock").insert(req.body);
    const createdInventory = await knex("stock")
      .where({ id: result[0] })
      .first()
      .select("id", "locations_id", "item_name", "quantity", "description");
    res.json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new item: ${error}`,
    });
  }
};

const edit = async (req, res) => {
  const { stockId: id } = req.params;
  try {
    await knex("stock").where({ id }).update(req.body);

    const updatedItem = await knex("stock")
      .where({ id })
      .first()
      .select("id", "locations_id", "item_name", "quantity", "description");

    res.json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to update stock with ID ${id}`, error });
  }
};

const remove = async (req, res) => {
  const { inventoryId: id } = req.params;
  try {
    await knex("stock").where({ id }).delete();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Unable to delete stock item.", error });
  }
};

module.exports = { index, findItem, newItem, edit, remove };
