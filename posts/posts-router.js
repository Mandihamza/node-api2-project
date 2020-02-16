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

// Get posts by id
router.get('/:id', (req, res) => {
    blog.findById(req.params.id)
    .then((posts) => {
        if (posts) {
            res
            .status(200)
            .json(posts)
        } else {
            res
            .status(404).json({
                message: "Posts not found",
            })
        }
    })
})

// Get post comments
router.get('/:id/comments', (req, res) => {
    blog.findPostComments(req.params.id)
    .then((comments) => {
        if (comments) {
            res
            .status(200)
            .json(comments)
        } else {
            res
            .status(404).json({
                message: "Comments not found",
            })
        }
    })
})

module.exports = router