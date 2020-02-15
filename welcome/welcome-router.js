const express = require('express')

const router = express.Router()

router.get("/", (req, res) => {
    res.send({ message: "Server is running 👍" })
})

router.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the blog post API!"
    })
})

module.exports = router