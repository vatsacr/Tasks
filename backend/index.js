const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const taskRoutes = require("./routes/tasks");

const api = express();
api.use(cors());
api.use(bodyParser.json());
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

//Mid-ware
api.use("/tasks", taskRoutes);
const port = 4000;

api.listen(port, () => console.log(`Server started on port ${port}`));
