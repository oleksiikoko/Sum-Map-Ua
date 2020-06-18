var crypto = require("crypto");

const MarkerModel = require("../models/Marker");

// const createJWToken = require("../utils/createJWToken");
// const verifyJWToken = require("../utils/verifyJWToken");

class MarkerController {
  create = (postData, res) => {
    const marker = new MarkerModel(postData.body.marker);
    console.log(postData.body.marker);
    marker
      .save()
      .then((obj) => {
        console.log("fads", obj);
        if (res) {
          res.json({
            status: "success",
            obj,
          });
        }
      })
      .catch((reason) => {
        if (res) {
          res.status(500).json({
            status: "error",
            message: reason,
          });
        }
      });
  };

  getAll = (req, res) => {
    MarkerModel.find()
      .populate("creator")
      .exec((err, markers) => {
        console.log(markers);
        if (err || !markers) {
          res.status(500).json({ status: "error", message: err });
        }
        res.json(markers);
      });
  };
}

exports.MarkerController = MarkerController;
