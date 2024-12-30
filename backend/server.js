const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
