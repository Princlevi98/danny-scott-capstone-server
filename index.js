const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { PORT: port } = process.env;
const order = require("./routes/order-routes");
const stock = require("./routes/stock-routes");
const user = require("./routes/user-routes");

app.use(express.json());
app.use(cors());

app.use("/order", order);
app.use("/stock", stock);
app.use("/user", user);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
