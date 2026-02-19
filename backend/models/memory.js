const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
  keyword: String,
  value: String
});

module.exports = mongoose.model("Memory", memorySchema);
