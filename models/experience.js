const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const experienceSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  resume:{
    
       url:String,
       filename:String,
     
  },
  company: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Experience", experienceSchema);
