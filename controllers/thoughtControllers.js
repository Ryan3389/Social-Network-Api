const Thought = require('../models/Thought')
const User = require('../models/User')

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
            const thought = await Thought.findOne({ _id: req.params.id })

            if (!thought) {
                return res.status(404).json('Thought not found')
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

            await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } }
            )
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
                { thoughtText: req.body.thoughtText, username: req.body.username },
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
            const thought = await Thought.findOne({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            const deletedThought = await Thought.findOneAndDelete({ _id: thought._id });

            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } }
            );

            res.status(200).json(deletedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json('Thought not found')
            }

            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
}