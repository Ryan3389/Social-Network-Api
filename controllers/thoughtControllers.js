const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = {
    //get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find()
            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },
    //get single thought
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

    //create thought
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

    //update thought
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

    //delete thought
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

    //create reaction
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
    },
    //delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
                { new: true, runValidators: true }
            )

            if (!thought) {
                res.status(404).json('No thought found')
            }

            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
}