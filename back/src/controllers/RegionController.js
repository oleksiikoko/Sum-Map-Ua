var crypto = require("crypto");

const RegionModel = require("../models/Region");

const regionsJson = require("../assets/data/regions.json");

// const createJWToken = require("../utils/createJWToken");
// const verifyJWToken = require("../utils/verifyJWToken");

class RegionController {
  constructor() {
    RegionModel.find({}, (err, regions) => {
      if (err || !regions || regions.length === 0) {
        regionsJson.map((item) => {
          const region = new RegionModel(item);

          region
            .save()
            .then((obj) => {
              console.log("fads", obj);
            })
            .catch((reason) => {});
        });
      }
    });
  }

  getAll = (req, res) => {
    RegionModel.find({}, (err, regions) => {
      console.log(regions);
      if (err || !regions) {
        res.status(500).json({ status: "error", message: err });
      }
      res.json(regions);
    });
  };
}

exports.RegionController = RegionController;
