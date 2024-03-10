const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", require("./api/auth"));
app.use("/api/contact", require("./api/contact"));
app.use("/api/data", require("./api/data"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});