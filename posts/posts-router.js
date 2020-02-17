const express = require('express')
const db = require('../data/db.js')

const router = express.Router()

// GET all posts array /api/posts
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

// GET posts by id /api/posts/:id
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
                message: "The post with the specified ID does not exist.",
            }).catch((err) => {
                res.status(500).json({ 
                    error: "The post information could not be retrieved." })
            });
        }
    })
})

// GET post comments /api/posts/:id/comments
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

//POST new post /api/posts/
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

//POST /api/posts/:postId/comments/:id
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const postComment = {...req.body, post_id: id}
    
    if (!id) {
        res
        .status(404)
        .json({ errorMessage: "The post with the specified ID does not exist." })
    } else if (!req.body.text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        db.insertComment(postComment)
        .then(comment => {
            res.status(201).json(comment)
        }).catch((err) => {
            res.status(500).json({ 
                error: "There was an error while saving the comment to the database" })
        });
    }
})

// DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
	db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been deleted",
				})
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: "The post could not be removed",
			})
		})
})

// PUT /api/posts/:id
router.put("/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing post title and contents",
		})
	}

	db.update(req.params.id, req.body)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts)
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the post",
			})
		})
})

module.exports = router
