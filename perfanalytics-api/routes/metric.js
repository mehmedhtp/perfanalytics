const express = require("express");
const router = express.Router();
const Metric = require("../db/metric");

/* POST
The code below will post metrics 
based on data if required fields
are valid.
*/
router.post("/", (req, res) => {
  let params = req.body;
  if (typeof params === "string") {
    params = JSON.parse(params);
  }

  new Metric(params)
    .save()
    .then((metric) => {
      res.json({
        message: "Metric saved",
        data: metric,
      });
    })
    .catch((error) => {
      res.status(500);
      res.json({
        message: "Metric could not save",
        error: error,
      });
    });
});

/* GET
The code below will get metrics 
in given date range if date range 
is given. Otherwise it will get 
only last 30 minutes metrics.
*/
router.get("/", (req, res) => {
  const beginDateTime = () => {
    if (req.query.min) return new Date(req.query.min).toString();

    const date = new Date();
    return date.setMinutes(date.getMinutes() - 30).toString();
  };

  const endDateTime = () => {
    if (req.query.max) return new Date(req.query.max).toString();

    return new Date().toString();
  };

  Metric.find({ date: { $gte: beginDateTime(), $lte: endDateTime() } })
    .sort({ date: 1 })
    .then((metrics) => {
      res.json(metrics);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

module.exports = router;
