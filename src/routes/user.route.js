const express = require('express');
const router = express.Router();
const {createUsers, getUserById, getUsers, updateUsers, deleteUser} = require('../controllers/UserController');
const {login, createUser, logout} = require('../controllers/AuthController');
const {addRecord, getRecord} = require('../controllers/CreateController');
const {checkToken, TRY, protectRoute} = require("../middlewares/ValidateToken")

// login check
const {validateSignup,validateLogin} = require("../middlewares/ValidateMiddleware")
const {loginSchema, registerSchema} = require("../validations/UserValidation")

router.post('/', validateSignup(registerSchema), createUser)
router.get('/', getUsers)
// router.get('/:id',checkToken, getUserById)
router.patch('/',checkToken, updateUsers)
router.delete('/',checkToken, deleteUser)
router.post('/login', validateLogin(loginSchema), login)
router.get('/logout', logout)



//get upload record
router.get('/get/:record', checkToken, getRecord)

//get upload record
router.get('/getforupload/:record', getRecord)





module.exports = router