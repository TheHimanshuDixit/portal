const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const token = "admin";

// POST /api/team/add
router.post("/add", async (req, res) => {
  const { name, position, image, email, password } = req.body;
  let newTeam = await Team.findOne({
    email,
  });
  if (newTeam) {
    return res.status(401).json({ message: "Team already exists" });
  }
  var salt = await bcrypt.genSalt(10);
  var hashpwd = await bcrypt.hash(password, salt);

  let team = new Team({
    name,
    position,
    image,
    email,
    password: hashpwd,
  });
  let resp = await team.save();
  let authAdminToken = jwt.sign({ email: email }, token, { expiresIn: "1d" });

  res.json({ message: "success", data: resp, authAdminToken: authAdminToken });
});

// POST /api/team/login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let team = await Team.findOne({ email });
  if (!team) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const pwd = await bcrypt.compare(password, team.password);
  if (!pwd) {
    return res.status(401).json({ message: "Invalid password" });
  }
  let authAdminToken = jwt.sign({ email: email }, token, { expiresIn: "1d" });
  res.json({ message: "success", authAdminToken: authAdminToken});
});

// GET /api/team/get
router.get("/get", async (req, res) => {
  let team = await Team.find();
  res.json({ data: team });
});

// GET /api/team/get/:id
router.get("/get/:id", async (req, res) => {
  let team = await Team.findOne({ _id: req.params.id });
  res.json({ data: team });
});

// PUT /api/team/update/:id
router.put("/update/:id", async (req, res) => {
  let team = await Team.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  res.json({ data: team });
});

// DELETE /api/team/delete/:id
router.delete("/delete/:id", async (req, res) => {
  let team = await Team.findOneAndDelete({ _id: req.params.id });
  res.json({ data: team });
});

module.exports = router;
