const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path');



dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


 app.use('/api/transactions', transactionRoutes);
 app.use('/api/products', productRoutes);

 app.use(express.static(path.join(__dirname,'/client/dist')));

 app.get('*',(req,res)=>{
    
     res.sendFile(path.join(__dirname,'client','dist','index.html'));
 })
 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
