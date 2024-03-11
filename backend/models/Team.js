const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model("team", TeamSchema);
// Team.createIndexes();
module.exports = Team;