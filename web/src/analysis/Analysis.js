import React from 'react';
import HoursBarChart from '../HoursBarChart';
import DaysBarChart from '../DaysBarChart';
import LineChart from "../LineChart";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './analysis.css';

function Analysis() {
    const BarContext = React.createContext({toggleOption: 0, chartInstance:null})
    return (
    <div id="productivity">
        <div className="Analysis">
            <div className="top">
                <h1>My Productivity</h1>    
                <div className="button-container">
                    <button type="button" className="time-button button1">Last 24 hrs</button>
                    <button type="button" className="time-button button2">Last 7 days</button>
                    <button type="button" className="time-button button3">Last 30 days</button>
                </div>
            </div>
            <div className="bottom">
                <div className="box box2"></div>
                <div className="box box1">
                Fill in
                </div>     
                <Carousel>
                    <div>
                    <HoursBarChart context={BarContext}/>
                    </div>
                    <div>
                    <DaysBarChart context={BarContext}/>
                    </div>
                    <div>
                    <LineChart />
                    </div>
                </Carousel>       
            </div>
        </div>
    </div>
  );
}

export default Analysis;
