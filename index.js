const dotenv = require("dotenv");
dotenv.config();
const { connect } = require("./database/dbConfig.js");
const express = require("express");
const cors = require("cors");
const router = require("./routes");

// database connection
connect();

// express & middlewires
const app = express();
app.use(express.json());
app.use(router);
app.use(cors());


let port = process.env.PORT || 3000; // Provide a default port if not specified in the .env
app.listen(port, () => console.log(`Server running on port ${port}`));
