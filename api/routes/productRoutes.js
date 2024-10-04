
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


router.post('/initialize', productController.initializeDatabase);


module.exports = router;
