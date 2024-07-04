const router = require('express').Router()

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

// /api/users
router.route('/').get(getAllUsers).post(createUser).put(updateUser).delete(deleteUser)
//  /api/users/:id
router.route('/:id').get(getSingleUser)


module.exports = router

