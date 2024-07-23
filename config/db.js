const mongoose = require("mongoose")
const url = process.env.MONGO_URL

mongoose
  .connect(url)
  .then(() => {
    console.info("DB has been connected")
  })
  .catch((error) => {
    console.error("Error while connecting to mongodb connection")
  })
