const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password_hash: {
    type: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
