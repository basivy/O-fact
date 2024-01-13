import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';
import "./Measure.css";

const socket = io('http://localhost:4000');
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
              0, 0, 0,
              0, 0, 0,
              0, 0
            ],
            backgroundColor: gradient,
            borderColor: 'rgba(43,192,76,0.8)',
            pointBackgroundColor: 'rgba(43,192,76,0.8)',
            fill: true,
            
          },
        ]
      }
    });

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
      <div class="dash- row gx-0">
         <div class="textcol tem col  textcol">
            <h6 >Temperature</h6>
                 26 °C
           </div>
         <div class="textcol heat col-6 ">

      <div class='bonno '>
          <i class="heaton fi fi-sr-add"></i>
             <h4>  &nbsp;&nbsp; heater on</h4></div>
         </div>
    <div class="textcol something col ">
   <h6> processing % </h6>
        <div className="cdd circle-progress loading"></div>
    </div>


    </div>
    <div class="dash- row gx-0">
       <div class="col">
        
         <div className='chart-bar'><h6 className='title-chart'>Combo Bar and line Chart</h6>
         <canvas ref={chartRef} id="bar" />

           
 </div>
 </div>
 <div class="col">
         <div >
          

           
 </div>
 </div>
</div>
</div>
  );
};

export default Measure; 
