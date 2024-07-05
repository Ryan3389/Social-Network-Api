const router = require('express').Router()

const {
    createReaction,
    deleteReaction
} = require('../../controllers/reactionControllers')

router.route('/').post(createReaction)
router.route('/:id').delete(deleteReaction)