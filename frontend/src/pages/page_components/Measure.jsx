import React, { useState } from 'react';

function Measure() {
  const [response, setResponse] = useState('');

  const fetchData = async () => {
    try {
      const requestBody = { /* Your request body data here */ };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      };

      const url = 'http://127.0.0.1:8000/generate';
      const res = await fetch(url, requestOptions);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Trigger fetchData when the component mounts or as needed
  // For example, you can call fetchData when a button is clicked
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default Measure;
