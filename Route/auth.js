const router = require('express').Router();
const authCOntroller = require('../Controller/auth-controller')

// REGISTER-----------
router.route('/register').post(authCOntroller.userRegister)
router.route('/login').post(authCOntroller.login)


module.exports = router; 