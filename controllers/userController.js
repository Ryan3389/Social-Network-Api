const User = require('../models/User')
const Thought = require('../models/Thought')

module.exports = {
    async getAllUsers(req, res) {
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.id })
                .select('__v')

            if (!singleUser) {
                res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json(singleUser)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.status(200).json(newUser)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    //check class activities if this is correct
    async updateUser(req, res) {
        try {

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { username: req.body, email: req.body },
                { new: true }
            )

            res.status(200).json(updatedUser)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = User.findOne(req.params.id)

            const deletedUser = User.findOneAndDelete(user)

            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json(deletedUser)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
}