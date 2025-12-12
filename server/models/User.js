const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserScheme);

