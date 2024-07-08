const router = require('express').Router()

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/userController')

// /api/users
router.route('/').get(getAllUsers).post(createUser)
// /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend)

module.exports = router

