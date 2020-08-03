const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Incomplete",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
