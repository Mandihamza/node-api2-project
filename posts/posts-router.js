const express = require('express')
const blog = require('../data/db.js')

const router = express.Router()

// GET all posts
router.get('/', (req, res) => {
    blog.find()
    .then((posts) => {
        res
        .status(200)
        .json(posts)
    }).catch((err) => {
        console.log(err)
        res 
        .status(500)
        .json({
            error: "The posts information could not be retrieved.",
        })
        
    });
})

module.exports = router