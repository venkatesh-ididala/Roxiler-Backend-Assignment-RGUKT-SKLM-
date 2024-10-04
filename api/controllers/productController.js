
const productService = require('../services/productService');



const initializeDatabase = async (req, res) => {
  try {
    const result = await productService.seedDatabase();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {

  initializeDatabase
};
