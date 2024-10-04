const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction');


const seedDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    
    await ProductTransaction.insertMany(transactions);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error in  seeding the database:', error);
  }
};

seedDatabase();
