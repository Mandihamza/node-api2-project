const express = require('express')
const db = require('../data/db.js')

const router = express.Router()

// GET all posts
router.get('/', (req, res) => {
    db.find()
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

// GET posts by id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
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

// GET post comments
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
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

//POST new post
router.post('/', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(req.body)
    .then(posts => {
        res.status(201).json(posts)
    }).catch((err) => {
        res.status(500).json({ 
            error: "There was an error while saving the post to the database" })
    });
    }
})

module.exports = router
