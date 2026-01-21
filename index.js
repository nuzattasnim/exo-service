const express = require("express");
const app = express();
const cors = require("cors");

// middleware to parse JSON
app.use(express.json());
app.use(cors());

// simple API route
app.get("/api/hello", (req, res) => {
  res.json({ 
    message: "Hello from Express API!",
    req: {
      headers: req.headers,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params
    }
  });
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


app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    res.write(`Chunk ${counter}\n`);
  }, 100); // send data every 100ms

  // Stop streaming when client disconnects
  req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

// start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
