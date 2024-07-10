const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
    //get all users
    async getAllUsers(req, res) {
        try {
            let users = await User.find()
                .populate('thoughts')
                .populate({ path: 'friends', select: 'username', options: { lean: true, virtuals: false } })

            res.status(200).json(users)
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    },

    //get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate({ path: 'thoughts', options: { lean: true, virtuals: false } })
                .populate({ path: 'friends', select: 'username _id', options: { lean: true, virtuals: false } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            const userObject = user.toObject({ virtuals: true });

            res.status(200).json(userObject);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    ///create user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.status(200).json(newUser)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    //update user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { username: req.body.username, email: req.body.email },
                { new: true }
            )

            res.status(200).json(updatedUser)
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    },

    //delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const deletedUser = await User.findOneAndDelete({ _id: user._id })

            res.status(200).json(deletedUser)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    //add friend
    async addFriend(req, res) {
        try {
            const friendId = req.params.friendId;

            if (!friendId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({ message: 'Invalid friend ID' })
            }

            let user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friendId } },
                { new: true }
            ).populate({ path: 'friends', select: 'username', options: { lean: true, virtuals: false } })

            if (!user) {
                return res.status(404).json('No user found')
            }

            user = user.toObject({ virtuals: true })

            res.status(200).json(user)

        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    },

    //delete friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json('No user found')
            }
            res.status(200).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }



};