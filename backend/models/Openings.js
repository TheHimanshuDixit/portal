const mongoose = require("mongoose");
const { Schema } = mongoose;

const OpeningSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
    default: "0T",
  },
  ctc: {
    type: String,
    default: "0L",
  },
  location: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  backlog: {
    type: String,
    required: true,
  },
  cgpacritera: {
    type: String,
    required: true,
  },
  branch: {
    type: Array,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  applyby: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Opening = mongoose.model("opening", OpeningSchema);
module.exports = Opening;
