const express = require("express");
// require("./db/mongoose");
const trainRouter = require("./routers/train");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json()); // parse incoming json to object for accessing it in request handlers
app.use(trainRouter); // registering user router

app.listen(port, () => {
  console.log("Server is up on the port " + port);
});