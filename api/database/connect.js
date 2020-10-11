const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

exports.connectDb = async (credentials) => {
  try {
    await mongoose.connect(credentials.url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.info(`Connect db:${credentials.url}`)
  } catch (error) {
    console.error(`Error connect db:${credentials.url} =>`, error)
  }
}
