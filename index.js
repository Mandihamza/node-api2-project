const express = require("express")
const blog = require("./data/db.js")
const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port =  4000

server.use(express.json())
server.use("/", welcomeRouter )

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})