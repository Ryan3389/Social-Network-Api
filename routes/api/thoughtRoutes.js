const router = require('express').Router()
const reactionRoutes = require('./reactionRoutes')

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtControllers')

// Thought Routes
router.route('/').get(getAllThoughts).post(createThought)
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought)

//Reaction Routes
router.use('/:thoughtId/reactions', reactionRoutes)
module.exports = router