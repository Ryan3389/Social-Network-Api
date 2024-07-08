const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts')
            res.status(200).json(users)
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .select('__v')
                .populate('thoughts');

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            res.status(200).json(user)
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

    async addFriend(req, res) {
        try {
            const friendId = req.params.friendId;


            if (!friendId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({ message: 'Invalid friend ID' });
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friendId } },
                { new: true }
            ).populate('friends');

            if (!user) {
                return res.status(404).json('No user found');
            }

            res.status(200).json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
};

// async addFriend(req, res) {
//     try {
//         const user = await User.findOneAndUpdate(
//             { _id: req.params.userId },
//             { $addToSet: { friends: req.body } },
//             { new: true }
//         )

//         if (!user) {
//             return res.status(404).json('No user found')
//         }

//         res.status(200).json(user)

//     } catch (error) {
//         console.error(error)
//         res.status(500).json(error)
//     }
// }
//};
