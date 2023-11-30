import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quotes = () => {
  const [csvData, setCsvData] = useState([]);
  console.log
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read-csv');
        setCsvData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <ul>
        {csvData.map((row, rowIndex) => (
          <li key={rowIndex}>
            {Object.values(row).map((value, columnIndex) => (
              <span key={columnIndex}>{value}</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;