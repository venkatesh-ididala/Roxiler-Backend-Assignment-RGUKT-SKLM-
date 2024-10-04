
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../services/api';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ month }) => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const priceRanges = [
    '0 - 100',
    '101 - 200',
    '201 - 300',
    '301 - 400',
    '401 - 500',
    '501 - 600',
    '601 - 700',
    '701 - 800',
    '801 - 900',
    '901 and above'
  ];

  useEffect(() => {
    const fetchBarChartData = async () => {
      setLoading(true);
      try {
        const chartData = await getBarChartData(month);  
        console.log('Fetched chart data:', chartData);
        setData(chartData);  
      } catch (err) {
        console.error('Error fetching bar chart data:', err);
        setError(err.message);  
      } finally {
        setLoading(false); 
      }
    };

    fetchBarChartData();
  }, [month]);

  
  const chartData = {
    labels: priceRanges,  
    datasets: [{
      label: 'Number of Items',
      data: data.map(item => item.count || 0),  
      backgroundColor: 'rgba(75, 192, 192, 0.6)', 
    }],
  };

  if (loading) return <p className="text-gray-600">Loading bar chart data...</p>;
  if (error) return <p className="text-red-500">Error fetching bar chart data: {error}</p>;
  if (!data.length) return <p>No data available for the selected month.</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
