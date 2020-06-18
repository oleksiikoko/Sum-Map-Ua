const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
  iso: { type: String },
  region_name: { type: String },
  s_values: { type: [Number] },
  d_values: { type: [Number] },
});

const RegionModel = mongoose.model("Region", RegionSchema);

module.exports = RegionModel;
