
const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction');

const seedDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

  
    await ProductTransaction.deleteMany({});

   
    await ProductTransaction.insertMany(transactions);

    console.log('Database seeded successfully');
    return { message: 'Database initialized and seeded successfully' };
  } catch (error) {
    console.error('Error seeding the database:', error);
    throw new Error('Error initializing the database');
  }
};

module.exports = {
  seedDatabase,
};
