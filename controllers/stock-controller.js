const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("locations")
      .join("stock", "stock.location_id", "locations.id")
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
  const id = req.params.stockId;
  try {
    const data = await knex("stock")
      .join("locations", "locations.id", "stock.location_id")
      .where({ "stock.id": id })
      .first()
      .select(
        "stock.id",
        "locations.id",
        "stock.item_name",
        "stock.quantity",
        "stock.description"
      );
    if (!data) {
      return res.status(404).send(`stock id ${id} not found`);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Unable to get stock item.", error });
  }
};

const newItem = async (req, res) => {
  try {
    const result = await knex("stock").insert(req.body);
    const createdStock = await knex("stock")
      .where({ id: result[0] })
      .first()
      .select("id", "location_id", "item_name", "quantity", "description");
    res.json(createdStock);
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
