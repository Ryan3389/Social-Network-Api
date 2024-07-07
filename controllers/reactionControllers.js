const Thought = require('../models/Thought')

module.exports = {

    async createReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const reaction = req.body;

            const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: reaction } },
                { new: true, runValidators: true }
            );

            if (!updatedThought) {
                return res.status(404).json('No thoughts found');
            }

            res.status(200).json(updatedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },



    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json('Thought not found');
            }

            res.status(200).json(updatedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

}