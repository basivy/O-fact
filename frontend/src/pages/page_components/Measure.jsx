import React, { useEffect, useRef } from 'react';
import "./Measure.css";
import Chat from './chat';

const Measure = () => {
 

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
    <div className='chart-bar'>
  <h6 className='title-chart'>Combo Bar and line Chart</h6>
  <Chat />
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
