const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://mehmedhtp:password2022@cluster0.cyeri.mongodb.net/perfanalyticsdb?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Connected to mongodb atlas");
    })
    .catch((error) => {
      console.log("Something wrong happened", error);
    });
};
