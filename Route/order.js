const router = require('express').Router();
const { verifyToken, verifyTokenandAuthorization, verifytokenandAdmin } = require('../VerifyToken');
const Controller = require('../Controller/order-controller')

router.route('/').post(verifyToken, Controller.orderadd)
router.route('/:id').put(verifytokenandAdmin, Controller.updateOrder)
router.route('/:id').delete(verifytokenandAdmin, Controller.deleteOrder)
router.route('/find/:userId').get(verifyTokenandAuthorization, Controller.getUserOrder)
router.route('/').get(verifytokenandAdmin, Controller.getAllorder)
router.route('/income').get(verifytokenandAdmin, Controller.getIncome)


module.exports = router;