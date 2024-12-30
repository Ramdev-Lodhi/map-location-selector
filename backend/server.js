const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, Ramdev!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
