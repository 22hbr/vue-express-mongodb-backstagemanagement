const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const ProfileScheme = new Scheme({
  type:{
    type:String,
  },
  description:{
    type:String,
  },
  income:{
    type:String,
    require:true
  },
  expend:{
    type:String,
    require:true
  },
  cash:{
    type:String,
    require:true
  },
  remark:{
    type:String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileScheme);