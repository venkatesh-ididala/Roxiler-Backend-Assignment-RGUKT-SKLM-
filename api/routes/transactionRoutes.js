const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');


router.get('/', transactionController.getAllTransactions);
router.get('/statistics', transactionController.getStatistics);
router.get('/bar-chart', transactionController.getBarChartData);
router.get('/pie-chart', transactionController.getPieChartData);
router.get('/combined-data', transactionController.getCombinedData);



module.exports = router;
