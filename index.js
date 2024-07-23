require("dotenv").config()
require("./config/db")

const express = require("express")
const routes = require("./routes")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use("/api/v1/", routes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.info("server is up and running on PORT: 8080")
})
