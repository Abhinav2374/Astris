const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Astris bot is running.");
});

app.listen(PORT, () => {
  console.log(`Hosting server running on port ${PORT}`);
});