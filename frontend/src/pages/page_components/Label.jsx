import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Label.css';
import imageSrc from '../../assets/1.png';
function Label() {
  const [csvFiles, setCsvFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/csvdata')
      .then(response => {
        setCsvFiles(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching CSV files: ', error);
      });
  }, []);

  return (
    <div className='Label-container'>
      <h2 className='Label'>Unlabeled</h2>
      <div className='row'> 
        {csvFiles.map((file, index) => (
          <div key={index} className='file col-12 col-sm-6 col-md-4 col-lg-2 '>
            <img src={imageSrc} alt={`Image ${index}`} />
            <h5 className='label-name'>{file}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Label;