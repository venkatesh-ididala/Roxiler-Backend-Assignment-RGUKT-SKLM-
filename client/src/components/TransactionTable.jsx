import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';
import SearchBar from './SearchBar';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const data = await getTransactions(month, search, page);
      setTransactions(data.transactions);
      setLoading(false);
    };
    fetchTransactions();
  }, [month, search, page]);

  return (
    <div className="p-4  shadow-md">
      <div className="mb-4">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{transaction.title}</td>
                  <td className="px-4 py-2">{transaction.description}</td>
                  <td className="px-4 py-2">{transaction.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{transaction.sold ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
     
      <div className="mt-4 flex justify-between">
        <button
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
