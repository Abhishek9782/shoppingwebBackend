const router = require('express').Router();
const { verifyToken, verifyTokenandAuthorization, verifytokenandAdmin } = require('../VerifyToken');
const Controller = require('../Controller/cart-controller')

router.route('/').post(verifyToken, Controller.Cartadd)
router.route('/:id').put(verifyTokenandAuthorization, Controller.updateCart)
router.route('/:id').delete(verifytokenandAdmin, Controller.deleteCart)
router.route('/find/:userId').get(verifyTokenandAuthorization, Controller.getUserCart)
router.route('/').get(verifytokenandAdmin, Controller.getAll)


module.exports = router;