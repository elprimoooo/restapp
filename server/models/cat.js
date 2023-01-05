const mongoose = require("mongoose");

const catSchema = mongoose.Schema({
  color: { type: String, required: true },
  weight: { type: Number, required: true },
});

module.exports = mongoose.model("Cat", catSchema);