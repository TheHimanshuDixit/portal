const express = require("express");
const Opening = require("../models/Opening");
const router = express.Router();
const nodemailer = require("nodemailer");
const Student = require("../models/Student");
require("dotenv").config();

// https://placement-portall.onrender.com/

const multer = require("multer");
const cloudinary = require("../helper/cloudinaryconfig");

// pdf storage path
const pdfconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: pdfconfig });

// POST /api/opening/add
router.post("/add", upload.single("file"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  let logo = result.secure_url;

  const {
    name,
    jobId,
    stipend,
    ctc,
    location,
    type,
    mode,
    role,
    backlog,
    cgpacritera,
    batch,
    branch,
    gender,
    duration,
    applyby,
  } = req.body;
  let newOpening = await Opening.findOne({
    jobId,
  });
  if (newOpening) {
    return res.status(401).json({ message: "Opening already exists" });
  }
  newOpening = new Opening({
    name,
    jobId,
    stipend,
    ctc,
    logo,
    location,
    type,
    mode,
    role,
    backlog,
    cgpacritera,
    batch,
    branch,
    gender,
    duration,
    applyby,
  });
  let resp = await newOpening.save();

  const output = `
                    <h4>New Opening for ${batch} batch</h4>
                    <h3>Opening Details : </h3>
                    <p>Name: ${name}</p>
                    <p>JobId: ${jobId}</p>
                    <p>Monthly Stipend: ${stipend}/Month</p>
                    <p>CTC: ${ctc} LPA</p>
                    <a href=${process.env.URL}>Click here to apply</a>
`;
  // Instantiate the SMTP server
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com"',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const allStudents = await Student.find();
  const allMail = allStudents.map((student) => student.email);

  // Specify what the email will look like
  var mailOption = {
    from: process.env.EMAIL, //Sender mail
    to: allMail, // Recever mail
    subject: "New Opening",
    html: output,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      res.json({ message: "Error Occurs" });
    } else {
      res.json({ message: "success", data: resp });
    }
  });
});

// POST /api/opening/getall
router.get("/getall", async (req, res) => {
  let resp = await Opening.find();
  res.json({ message: "success", data: resp });
});

// POST /api/opening/getbyid
router.get("/getbyid/:oid", async (req, res) => {
  let resp = await Opening.findOne({
    jobId: req.params.oid,
  });
  res.json({ message: "success", data: resp });
});

// POST /api/opening/delete
router.delete("/delete/:oid", async (req, res) => {
  let resp = await Opening.findById({
    _id: req.params.oid,
  });
  if (!resp) {
    return res.status(401).json({ message: "Opening does not exists" });
  }
  resp = await Opening.deleteOne({
    _id: req.params.oid,
  });
  res.json({ message: "success", data: resp });
});

// POST /api/opening/update
router.put("/update/:oid", async (req, res) => {
  let resp = await Opening.findById({
    _id: req.params.oid,
  });
  if (!resp) {
    return res.status(401).json({ message: "Opening does not exists" });
  }
  resp = await Opening.updateOne(
    { _id: req.params.oid },
    {
      $set: req.body,
    }
  );
  res.json({ message: "success", data: resp });
});

module.exports = router;
