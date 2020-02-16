const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const postsRouter = require("./posts/posts-router")

const server = express()
const port =  4000

server.use(express.json())
server.use("/", welcomeRouter )
server.use("/api/posts", postsRouter 
)


server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})