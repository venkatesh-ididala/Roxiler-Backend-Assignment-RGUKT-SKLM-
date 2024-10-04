const ProductTransaction = require('../models/ProductTransaction');


const getTransactions = async (search, page, perPage) => {
  const query = {};
  if (search) {
    query.$text = { $search: search };
  }

  const transactions = await ProductTransaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));

  const total = await ProductTransaction.countDocuments(query);
  return {
    transactions,
    total,
    currentPage: parseInt(page),
    perPage: parseInt(perPage),
  };
};




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




const getPieChartData = async (month) => {
  try {
    const monthMapping = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    month = month.trim();
    const monthNumber = monthMapping[month];
    const year = new Date().getFullYear();

    
    const transactions = await ProductTransaction.find({
      dateOfSale: {
        $gte: new Date(year, monthNumber, 1),
        $lt: new Date(year, monthNumber + 1, 1),
      },
    });

    const categoryCounts = {};

    transactions.forEach(transaction => {
      const category = transaction.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    return categoryCounts;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw new Error('Failed to fetch pie chart data');
  }
};


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


const getCombinedData = async (month) => {
  try {
    const statistics = await getStatistics(month);
    const barChartData = await getBarChartData(month);
    const pieChartData = await getPieChartData(month);

    return {
      statistics,
      barChartData,
      pieChartData,
    };
  } catch (error) {
    console.error('Error fetching combined data:', error);
    throw new Error('Failed to fetch combined data');
  }
};

module.exports = {
  getTransactions,
  getStatistics,
   getBarChartData,
  getPieChartData,
  getCombinedData,
};
