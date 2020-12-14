const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/trackmeet-mern";

const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

mongoose.connection.on("disconnect", function (event) {
  console.log("mongodb disconnected", event);
});

  module.exports = {
    User: require('./User'),
    Artist: require('./Artist'), 
    Genre: require('./Genre'),
    Song: require('./Song'),
    User: require('./User')
  }
