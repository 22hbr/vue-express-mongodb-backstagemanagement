const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email:{
    type:String,
    require:true
  },
  avatar:{
    type:String
  },
  identity:{
    type:String,
    require:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserScheme);

