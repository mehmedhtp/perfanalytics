const express = require("express");
const app = express();
require("dotenv").config();
const db = require('./db');
const cors = require('cors');
const metricRoute = require("./routes/metric");


const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

//routes
app.use("/metric", metricRoute);

//connect to mongo db atlas
db();

//start the server
app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
});

module.exports = app;