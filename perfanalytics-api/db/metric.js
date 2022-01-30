const mongoose = require("mongoose");

const MetricSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fcpTime: {
    type: Number,
    required: true,
  },
  ttfbTime: {
    type: Number,
    required: true,
  },
  domLoadTime: {
    type: Number,
    required: true,
  },
  windowLoadTime: {
    type: Number,
    required: true,
  },
  scriptResourceLoadTime: {
    type: Number,
    required: true,
  },
  cssResourceLoadTime: {
    type: Number,
    required: true,
  },
  imgResourceLoadTime: {
    type: Number,
    required: true,
  },
  linkResourceLoadTime: {
    type: Number,
    required: true,
  },
  httpResourceLoadTime: {
    type: Number,
    required: true,
  },
  fetchResourceLoadTime: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model("Metric", MetricSchema);
