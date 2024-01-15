import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';
import "./Chat.css";



const socket = io('http://localhost:3000', { transports: ['polling'] });
let chart; 

function Chat() {
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
                  callback: function(value) {
                      return value.toString(); 
                  }
              }
          },
            x: {
              display:false
            }
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
                padding: {
                  //top: 999, 
                  //bottom: 30
              }
              },
            }
        }
        },
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          datasets: [
            {
              type: 'line',
              label: 'sensor 1',
              pointStyle: 'circle',
              data: [
                50, 50, 50,
                50, 0, 50,
                50, 0
              ],
              backgroundColor: gradient,
              borderColor: 'rgba(43,192,76,0.8)',
              pointBackgroundColor: 'rgba(43,192,76,0.8)',
              fill: true,
              
            },
          ]
        }
      });

      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/sendData');
          const data = await response.json();
          chart.data.datasets[0].data = data;
          chart.update();if (chart) {
            chart.data.datasets[0].data = data;
            chart.update();
          } else {
            console.error('Chart instance is not defined.');
          }
        } 
        catch (error) {
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
        <div className='chat'>
            <canvas ref={chartRef} id="bar" />
        </div>
        
  )
}

export default Chat



