const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkerSchema = new Schema({
  position: {
    lat: { type: Number },
    lng: { type: Number },
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: "user in type is require",
  },
  system: { type: Number },
  systemType: { type: Number },
  square: { type: Number },
  calculations: {
    type: [{ kWh: { type: Number } }],
  },
  region_iso: {
    type: String,
  },
});

const MarkerModel = mongoose.model("Marker", MarkerSchema);

module.exports = MarkerModel;
