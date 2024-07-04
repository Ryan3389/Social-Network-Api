const Thought = require('../models/Thought')

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find()
            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne(req.params.id)

            if (!thought) {
                res.status(404).json('Thought not found')
            }

            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(200).json(error)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { thoughtText: req.body, username: req.body },
                { new: true }
            )

            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOne(req.params.id)
            const deletedThought = await Thought.findOneAndDelete(thought)

            if (!deletedThought) {
                res.status(404).json({ message: 'Thought not found' })
            }
            res.status(200).json(deletedThought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
}