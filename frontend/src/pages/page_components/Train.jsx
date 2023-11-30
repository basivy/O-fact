import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Train.css';

const Train = () => {
  const [apiResult, setApiResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFinish, setShowFinish] = useState(false);
  const [showApiResult, setShowApiResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/train');
        setApiResult(response.data.result);
        setLoading(false);

        setTimeout(() => {
          setShowFinish(true);
        }, 0);

        setTimeout(() => {
          setShowApiResult(true);
        }, 1700); // Show API result after 2 seconds of showing "Finish"
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='Train-container'>
      <h1>API Result:</h1>
      {loading ? (
        <div>
          <p>Loading...</p>
          <div className="circle-progress loading"></div>
        </div>
      ) : (
        <div>
          {showFinish && <p>Finish</p>}
          {showFinish && <div className="circle-progress2 loading"></div>}
          {showApiResult && <p>{apiResult}</p>}
        </div>
      )}
    </div>
  );
};

export default Train;
