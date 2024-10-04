const transactionService = require('../services/transactionService');
const ProductTransaction = require('../models/ProductTransaction');


const getAllTransactions = async (req, res) => {
  try {
    const { search, page = 1, perPage = 10 } = req.query;
    const response = await transactionService.getTransactions(search, page, perPage);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


// const getStatistics = async (req, res) => {
//   try {
//     const { month } = req.query;
//     const stats = await transactionService.getStatistics(month);
  
//     res.status(200).json(stats);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch statistics' });
//   }
// };



const getStatistics = async (req, res) => {
  try {
   
    const { month } = req.query;

   
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };

   
    const monthNumber = monthMap[month];

   
    if (!monthNumber) {
      return res.status(400).json({ message: 'Invalid month specified' });
    }

   
    const stats = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber], 
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },  
          soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },  
          notSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }, 
        },
      },
    ]);

    
    if (stats.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this month' });
    }

   
    const { totalSales, soldItems, notSoldItems } = stats[0];

    
    res.json({
      totalSaleAmount: totalSales,
      soldItems: soldItems,
      notSoldItems: notSoldItems,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};



// const getBarChartData = async (req, res) => {
//   try {
//     const { month } = req.query;
//     const barChart = await transactionService.getBarChartData(month);
//     res.status(200).json(barChart);
//   } catch (error) {
    
//     res.status(500).json({ error: 'Failed to fetch bar chart data' });
//   }
// };



const getBarChartData = async (req, res) => {
  try {
    
    const { month } = req.query;
  
    const monthMapping = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

   
    const monthNumber = monthMapping[month];
    if (!monthNumber) {
      return res.status(400).json({ error: 'Invalid month name. Use full month names.' });
    }
    const barChartData = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber], 
          },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], 
          default: "901-above", 
          output: {
            count: { $sum: 1 }, 
          },
        },
      },
    ]);

    console.log(barChartData);


    if (barChartData.length === 0) {
      return res.status(404).json({ message: 'No data found for the specified month' });
    }

    res.json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Error fetching bar chart data' });
  }
};


const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const pieChartData = await transactionService.getPieChartData(month);
    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
};

const getCombinedData = async (req, res) => {
  try {
    const { search, page = 1, perPage = 10, month } = req.query;
    const combinedData = await transactionService.getCombinedData(search, page, perPage, month);
    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
};

module.exports = {
  getAllTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData
};
