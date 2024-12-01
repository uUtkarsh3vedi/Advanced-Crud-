const express = require("express");
const app = express();
const connection = require("./database/db");
const routes = require("./routes/routes");
const PORT = 8000;

app.use(express.json());

app.use(routes);

connection();

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
