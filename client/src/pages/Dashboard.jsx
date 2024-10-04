



import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import Statistics from '../components/Statistics';
import BarChart from '../components/BarChart';

const Dashboard = () => {
  const [month, setMonth] = useState('March'); 

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Transactions Dashboard
      </h1>

  
      <div className="flex items-center justify-center mb-8">
        <label className="text-lg font-medium mr-3 text-gray-700">
          Select Month:
        </label>
        <select 
          value={month} 
          onChange={(e) => setMonth(e.target.value)} 
          className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Statistics</h2>
          <Statistics month={month} />
        </div>
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales by Price Range</h2>
          <BarChart month={month} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction Table</h2>
        <TransactionTable month={month} />
      </div>
    </div>
  );
};

export default Dashboard;

