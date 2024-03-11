const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comapny",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  enroll: {
    type: String,
    required: true,
  },
  branch: {
    type: Object,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Application = mongoose.model("application", ApplicationSchema);
module.exports = Application;