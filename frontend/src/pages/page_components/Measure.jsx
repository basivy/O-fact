import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';
const socket = io('http://localhost:3000', { transports: ['polling'] });
import { Routes } from 'react-router-dom';
import Chat from './chat';
import "./Measure.css";
let chart;

const Measure = () => {

  const chartRef = useRef(null);
  
  useEffect(() => {

    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(43,192,76,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    chart = new Chart(ctx, {
      type: 'line',
      options: {
        scales: {
          y: {
            type: 'linear',
            min: 0,
            max: 120,
            ticks: {
              stepSize: 30,
              callback: function (value) {
                return value.toString();
              },
            },
          },
          x: {
            display: false,
          },
        },
        tension: 0.3,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 7,
              usePointStyle: true,
            },
            title: {
              display: false,
              text: 'Combo Bar and line Chart',
              padding: {},
            },
          },
        },
      },
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            type: 'line',
            label: 'sensor 1',
            pointStyle: 'circle',
            data: [50, 50, 50, 50, 0, 50, 50, 0],
            backgroundColor: gradient,
            borderColor: 'rgba(43,192,76,0.8)',
            pointBackgroundColor: 'rgba(43,192,76,0.8)',
            fill: true,
          },
        ],
      },
    });

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/sendData');
        const data = await response.json();
        chart.data.datasets[0].data = data;
        chart.update();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      fetchData(); 
 

    socket.on('lastRowValues', (res) => {
      chart.data.datasets[0].data = res;
      chart.update();
    });

    return () => {
      socket.disconnect();
      chart.destroy();
    };
  }, []);


  return (
    <div className='dash'>
      <div className="dash- row gx-0">
        <div className="textcol tem col textcol">
          <h6>Temperature</h6>
          26 °C
        </div>
        <div className="textcol heat col-6">
          <div className='bonno'>
            <i className="heaton fi fi-sr-add"></i>
            <h4>&nbsp;&nbsp; heater on</h4>
          </div>
        </div>
        <div className="textcol something col">
          <h6>processing %</h6>
          <div className="cdd circle-progress loading"></div>
        </div>
      </div>

      <div className="dash- row gx-0">
        <div className='chart-bar'>
          <h6 className='title-chart'>Combo Bar and Line Chart</h6>
          <canvas ref={chartRef} id="bar" />
        </div>
        <div className="col">
            <Routes>
            <Switch>
            <Route path="/Chat" component={Chat} />
            </Switch>
            <Routes/>
        </div>
      </div>
    </div>
  );
};

export default Measure;
