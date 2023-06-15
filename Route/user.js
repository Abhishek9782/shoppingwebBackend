const router = require('express').Router();
const Controller = require('../Controller/user-controller')
const { verifyToken, verifyTokenandAuthorization, verifytokenandAdmin } = require('../VerifyToken')

router.route('/:id').put(verifyTokenandAuthorization, Controller.updateUser);
router.route('/:id').delete(verifyTokenandAuthorization, Controller.delete);
router.route('/find/:id').get(verifytokenandAdmin, Controller.getUser);
router.route('/Getalluser').get(verifytokenandAdmin, Controller.getAllUser);
router.route('/stats').get(verifytokenandAdmin, Controller.State);





module.exports = router;