import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './analysis.css';

function Analysis() {
  return (
    <div className="Analysis">
        <div className="top">
            <h1>My Productivity</h1>    
            <div className="button-container">
                <button type="button" class="time-button button1">Last 24 hrs</button>
                <button type="button" class="time-button button2">Last 7 days</button>
                <button type="button" class="time-button button3">Last 30 days</button>
            </div>
        </div>
        <div className="bottom">
            <div className="box box2"></div>
            <div className="box box1">
                Fill in
            </div>     
            <Carousel>
                <div>
                    <img src="https://i.pinimg.com/originals/cc/42/2c/cc422cc47f70d0a822ca45d4526f583a.jpg" alt="hours" />
                </div>
                <div>
                    <img src="https://i.pinimg.com/originals/cc/42/2c/cc422cc47f70d0a822ca45d4526f583a.jpg" alt="days"/>
                </div>
                <div>
                    <img src="https://i.pinimg.com/originals/cc/42/2c/cc422cc47f70d0a822ca45d4526f583a.jpg" alt="month"/> 
                </div>
            </Carousel>       
        </div>
      
    </div>
  );
}

export default Analysis;
