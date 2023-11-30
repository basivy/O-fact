import React from 'react';
import './page_css/Processing.css';
import { BrowserRouter , Routes, Route , NavLink} from 'react-router-dom';
import Label from './page_components/Label';
import Measure from './page_components/Measure';
import Train from './page_components/Train';
import Use from './page_components/Use';

function Processing() {
  return (
    <BrowserRouter>
    <div className='container-1'>
      <div className='Sidebar'>
      <div className='container-sidebar'>
        <div className='ham'><h1><a href='/'>...</a></h1></div>  
        <div className='box-savename'><input className='savename' placeholder="Untitled"></input></div>
        <div className='botton-processing'>
          <ul className='ui-botton-processing'>
            <li className='li-botton-processing'><NavLink to='/start/Measure'><button className='button-li'>Measure</button></NavLink></li>
            <li className='li-botton-processing'><NavLink to='/start/Label'><button className='button-li'>Label</button></NavLink></li>
            <li className='li-botton-processing'><NavLink to='/start/Train'><button className='button-li'>Train</button></NavLink></li>
            <li className='li-botton-processing'><NavLink to='/start/Use'><button className='button-li'>Use</button></NavLink></li>
          </ul>
        </div>
        <div className='Start'>
          <button className='button-start'>Start</button>
        </div>
        </div>
        </div>

        <div className='Main'>
          <Routes>
           <Route path="/" element={<div className='start-main'><p>To start training you model, import and label some images</p></div>} />
           <Route path="/start/Measure" element={<Measure />} />
           <Route path="/start/label" element={<Label />} />
           <Route path="/start/train" element={<Train />} />
           <Route path="/start/use" element={<Use />} />
          </Routes>
        </div>
         
    </div>
    </BrowserRouter>
  )
}

export default Processing;