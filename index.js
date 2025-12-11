const express = require("express");
const app = express();
const cors = require("cors");

// middleware to parse JSON
app.use(express.json());
app.use(cors());

// simple API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

// optional: a POST example
app.post("/api/echo", (req, res) => {
  res.json({ you_sent: req.body });
});

// K-pop songs route
const kpopData = require("./data/kpop.json");
app.get("/api/kpop", (req, res) => {
  res.json(kpopData);
});

// start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
