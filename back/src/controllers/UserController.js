var crypto = require("crypto");

const UserModel = require("../models/User");

const createJWToken = require("../utils/createJWToken");
const verifyJWToken = require("../utils/verifyJWToken");

class UserController {
  show = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "User not fount",
        });
      }
      res.json(user);
    });
  };

  getMe = (req, res) => {
    const token = req.headers.token;
    verifyJWToken(token)
      .then((user) => {
        console.log("user", user.data._doc);
        res.json(user);
      })
      .catch((err) => {
        res.status(403).json({ message: "Invalid auth token provided." });
      });
  };

  signup = (req, res) => {
    const postData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    this.create(postData, res);
  };

  create = (postData, res) => {
    const user = new UserModel({
      email: postData.email,
      username: postData.username,
      password_hash: crypto
        .createHash("md5")
        .update(postData.password)
        .digest("hex"),
    });
    console.log("object");
    user
      .save()
      .then((obj) => {
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

  login = (req, res) => {
    const postData = {
      username: req.body.username,
      password: req.body.password,
    };

    console.log(postData);

    UserModel.findOne({ username: postData.username }, (err, user) => {
      console.log(
        user.password_hash,
        crypto.createHash("md5").update(postData.password).digest("hex")
      );
      if (
        user.password_hash ===
        crypto.createHash("md5").update(postData.password).digest("hex")
      ) {
        const token = createJWToken(user);

        res.json({
          status: "success",
          token,
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "Incorrect password or username",
        });
      }
    });
  };
}

exports.UserController = UserController;
