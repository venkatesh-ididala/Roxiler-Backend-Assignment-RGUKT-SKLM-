import React, { useEffect, useState } from 'react';
import { getStatistics } from '../services/api'; 

const Statistics = ({ month = 'March' }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log('Received month:', month);
  }, [month]);

 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        if (!month || typeof month !== 'string') {
          throw new Error('Invalid month provided');
        }

        const trimmedMonth = month.trim(); 
        const stats = await getStatistics(trimmedMonth); 
        console.log('Statistics fetched:', stats);

        
        setStats({
          totalSaleAmount: stats.totalSaleAmount || 0,
          soldItems: stats.soldItems || 0,
          notSoldItems: stats.notSoldItems || 0,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to load statistics');
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [month]);

  if (loading) {
    return <p className="text-gray-500">Loading statistics...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Statistics for {month}</h2>
      <p className="text-lg text-gray-700">Total Sale Amount: <strong>${stats.totalSaleAmount}</strong></p>
      <p className="text-lg text-gray-700">Sold Items: <strong>{stats.soldItems}</strong></p>
      <p className="text-lg text-gray-700">Not Sold Items: <strong>{stats.notSoldItems}</strong></p>
    </div>
  );
};

export default Statistics;
