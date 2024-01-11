import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';

const MyChart = () => {
  const [lastDate, setLastDate] = useState(0);
  const [data, setData] = useState([]);

  const getNewSeries = (baseval, yrange) => {
    const newDate = baseval + 86400000;
    setLastDate(newDate);

    const newData = {
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
    };

    setData([...data, newData]);
  };

  const resetData = () => {
    setData(data.slice(data.length - 10));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getNewSeries(lastDate, { min: 100, max: 900 });
    }, 2000);

    return () => clearInterval(interval);
  }, [lastDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      resetData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 2000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Dynamic Updating Chart',
      align: 'left',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      range: 777600000,
    },
    yaxis: {
      max: 2000,
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="app">
      <div id="chart">
        <ApexChart
          type="line"
          height={350}
          options={chartOptions}
          series={[{ data: data }]}
        />
      </div>
    </div>
  );
};

export default MyChart;
