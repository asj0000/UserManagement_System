const express = require('express')
const router = express.Router()
const cutomerController = require('../controller/cutomerController')


router.get('/', cutomerController.homepage)
router.get('/about', cutomerController.aboutPage)
router.get('/add' , cutomerController.addCustomer)
router.post('/add' , cutomerController.postCustomer)

router.get('/view/:id' , cutomerController.view)
router.get('/edit/:id' , cutomerController.edit)
router.put('/edit/:id' , cutomerController.editPost)

router.delete('/edit/:id' , cutomerController.deleteCustomer)

router.post('/search' , cutomerController.searchCustomer)


module.exports = router