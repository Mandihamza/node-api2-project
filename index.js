const express = require("express")

const server = express()
const port =  4000

server.use(express.json())

server.get("/", (req, res) => {
    res.send({ message: "Server is running 👍" })
})

server.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the blog post API!"
    })
})

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})