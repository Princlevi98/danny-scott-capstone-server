const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { PORT: port } = process.env;
const locations = require("./routes/locations-routes");
const stock = require("./routes/stock-routes");

app.use(express.json());
app.use(cors());

app.use("/location", locations);
app.use("/stock", stock);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
