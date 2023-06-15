const router = require('express').Router();
const Controller = require('../Controller/product-controller')
const { verifyToken, verifyTokenandAuthorization, verifytokenandAdmin } = require('../VerifyToken')

router.route('/').post(Controller.product)
router.route('/:id').put(verifytokenandAdmin, Controller.productUpdate)
router.route('/find/:id').get(Controller.FindProduct)
router.route('/').get(Controller.GetAllproduct)






module.exports = router;